#!/usr/bin/python
from __future__ import annotations

import json
import amqp
from typing import Dict, Any
from time import sleep
import logging
from systemd.journal import JournalHandler
import pycouchdb

logger = logging.getLogger('homemanager')
logger.addHandler(JournalHandler())
logger.setLevel(logging.DEBUG)

class JConfig:
    def __init__(self) -> None:
        self._config: Dict[str, Any] = {}
    
    def load_config_from_file(self, path:str):
        with open(path) as conf_file:
            self._config = json.load(conf_file)
        
    def get(self, key:str) -> Any:
        if key in self._config:
            return self._config[key]
        else:
            return ''
    
    def __getitem__(self, key: str) -> Any:
        return self.get(key)
    
    def __str__(self):
        return str(self._config)
    
    def __contains__(self, item: str):
        return item in self._config
    

class MainWatcher:
    def __init__(self, config: JConfig) -> None:
        self.config = config
        self.connection:amqp.Connection
        self.connected = False
        self.retry = True
        
        self.sslopts = {'certfile': self.config['rabbitmq']['certfile'],
                        'keyfile': self.config['rabbitmq']['keyfile'],
                        'cafile': self.config['rabbitmq']['cafile'],
                        'password': self.config['rabbitmq']['password'],
                        "server_hostname": self.config['rabbitmq']['host']}
        self.homes:Dict[str, HomeManager] = {}
        
        if 'couchdb' in self.config:
            self.db_connection:pycouchdb.Client = pycouchdb.Client(
                f"http://{self.config['couchdb']['user']}:{self.config['couchdb']['password']}@{self.config['couchdb']['url']}:{self.config['couchdb']['port']}")
                                                                  
        else:
            self.db_connection:pycouchdb.Client = pycouchdb.Client("http://localhost")
            
        print(f'main watcher, {self.db_connection}')

    def connect(self):
        while not self.connected and self.retry:
            try:
                self.connection = amqp.Connection(f"{self.config['rabbitmq']['host']}:{self.config['rabbitmq']['port']}",
                                                  userid=self.config['rabbitmq']['user'], password=self.config['rabbitmq']['user_password'],
                                                  ssl=self.config['rabbitmq']['ssl'], ssl_options=self.sslopts, login_method='AMQPLAIN')
                self.connection.connect()
                channel = self.connection.channel()
                channel.exchange_declare('homedaemon', 'topic', auto_delete=False)
                channel.queue_declare('main_queue')
                channel.queue_bind('main_queue', 'homedaemon', routing_key='homedaemon.main')
                channel.basic_consume(queue='main_queue', callback=self.on_message, no_ack=True)
                self.connected = True
            except ConnectionRefusedError as err:
                self.connected = False
                print(err)
                sleep(10)
                print('Retray after 5s')
    
    def on_message(self, msg:Any):
        try:
            event = json.loads(msg.body)
            cmd:str = event.get('cmd', '')
            if cmd == 'connect':
                print('connect: ', event)
                homeid:str = event.get('homeid', '')
                if homeid not in self.db_connection:
                    self.db_connection.create(homeid)
                self.homes[homeid] = HomeManager(self.connection, homeid, self.db_connection.get_db(homeid))
            else:
                print(event)
        except json.JSONDecodeError as err:
                logger.error(f'json {err} : {msg}')
    
    def run(self):
        self.connect()
        while True:
            try:
                self.connection.drain_events()
            except ConnectionResetError:
                self.connected = False
                self.connect()
            except OSError:
                self.connected = False
                self.connect()
            except KeyboardInterrupt:
                self.retry = False
                if self.connection.connected:
                    self.connection.close()
                break
                

class HomeManager:
    def __init__(self, connection:amqp.Connection, homeid:str, db:pychoudb.db.Databaase) -> None:
        self.connection = connection
        self.channel = self.connection.channel()
        self.homeid = homeid
        self.db:pychoudb.db.Databse = db
        self.add_queues()
        print('homemanager started')
    
    def add_queues(self):
        self.channel.queue_declare(self.homeid)
        self.channel.queue_bind(self.homeid, 'homedaemon', routing_key=f'homedaemon.{self.homeid}.reports')
        self.channel.basic_consume(queue=self.homeid, callback=self.on_event, no_ack=True)
    
    def on_event(self, msg:Any):
        actions:Dict[str, Any] = {
            'report': self.update_device,
            'init_device': self.init_device,
            'del_device': self.del_device
            }
        try:
            event = json.loads(msg.body)
            cmd:str = event.pop('cmd', '')
            print('cmd', event)
            if event.get('sid'):
                actions.get(cmd, self._command_not_found)(event)
        except json.JSONDecodeError as err:
                logger.error(f'json {err} : {msg}')
        except AttributeError as err:
                logger.error(f'AtrributeError {err} : {msg}')
    
    def update_device(self, event:Dict[str, Any]) -> None:
        self.db[event['sid']] = event.get('data', {})
    
    def init_device(self, event:Dict[str, Any]) -> None:
        if event['sid'] in self.db:
            self.db.delete(event['sid'])
        self.db[event['sid']] = event
    
    def del_device(self, event:Dict[str, Any]) -> None:
        self.db.delete(event['sid'])
    
    def _command_not_found(self, data:Dict[str, Any]) -> None:
        pass
    
    def __del__(self):
        self.channel.queue_unbind(self.homeid, 'homedaemon', routing_key=f'homedaemon.{self.homeid}.reports')


if __name__ == '__main__':
    config = JConfig()
    config.load_config_from_file('tmp/homedb.json')
    watcher = MainWatcher(config)
    watcher.run()
