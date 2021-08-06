#!/usr/bin/python
from __future__ import annotations
import json
import amqpstorm
import ssl
from time import sleep
from threading import Thread
from typing import Dict, Any
import logging
from systemd.journal import JournalHandler
from pycouchdb import Client, Database

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
        self.config = config['rabbitmq']
        self.protocol = None
        self.connected = False
        self.retry = True
        self.homes:Dict[str, HomeManager] = {}
        self.db_connection:Client
        self.connection:amqpstorm.Connection
         
        if 'couchdb' in config:
            self.db_connection = Client(
                f"http://{config['couchdb']['user']}:{config['couchdb']['password']}@"
                f"{config['couchdb']['url']}:{config['couchdb']['port']}")                                                       
        else:
            self.db_connection = Client("http://localhost")
            
        print(f'main watcher, {self.db_connection}')

    def connect(self):
        while not self.connected and self.retry:
            try:
                context = ssl.create_default_context(cafile=self.config['cafile'])
                context.load_cert_chain(certfile=self.config['certfile'],
                                        keyfile=self.config['keyfile'],
                                        password=self.config['password'])
                self.ssl_options = {'context': context,
                                    'check_hostname': True,
                                    'server_hostname': self.config['host']}
                
                self.connection:amqpstorm.Connection = amqpstorm.Connection(hostname=self.config['host'],
                                                                            username=self.config['user'],
                                                                            password=self.config['user_password'],
                                                                            port=self.config['port'],
                                                                            ssl=self.config['ssl'],
                                                                            ssl_options=self.ssl_options)
                
                
                self.channel:amqpstorm.Channel = self.connection.channel()
                self.channel.exchange.declare(exchange='homedaemon', exchange_type='topic', auto_delete=False)
                self.channel.queue.declare(queue='main_queue')
                self.channel.queue.bind(queue='main_queue', exchange='homedaemon', routing_key='homedaemon.main')
                self.channel.basic.consume(queue='main_queue', callback=self.on_message, no_ack=True)
                self.connected = True
                self.channel.start_consuming()
            except amqpstorm.AMQPConnectionError as err:
                self.connected = False
                print(err)
                sleep(5)
                print('Retray after 5s')
            except KeyboardInterrupt:
                self.stop()
                
    def stop(self):
        for home_name, home in self.homes.items():
            print(f'Stop {home_name}')
            home.stop()
        self.channel.close()
    
    
    def on_message(self, msg_data:amqpstorm.Message):
        try:
            event = json.loads(msg_data.body)
            cmd:str = event.get('cmd', '')
            homeid:str = event.get('homeid', '')
            if cmd == 'connect' or cmd == 'ping':
                self.register_home(homeid)
            else:
                print(event)
        except json.JSONDecodeError as err:
                logger.error(f'json {err} : {msg_data}')
    
    def register_home(self, homeid:str):
        if homeid in self.homes:
            return
        
        if homeid not in self.db_connection:
            self.db_connection.create(homeid)
        
        self.homes[homeid] = HomeManager(self.channel, homeid, self.db_connection.get_db(homeid))
        self.homes[homeid].start()
                

class HomeManager(Thread):
    def __init__(self, channel:  amqpstorm.Channel, homeid:str, db:Database) -> None:
        super().__init__()
        self.daemon = True
        self.channel = channel
        self.homeid = homeid
        self.db: Database = db
        print('homemanager started')
    
    def start(self):
        self.channel.queue.declare(self.homeid)
        self.channel.queue.bind(queue=self.homeid, exchange='homedaemon', routing_key=f'homedaemon.{self.homeid}.reports')
        self.channel.basic.consume(callback=self.on_event, queue=self.homeid, no_ack=True)
    
    def stop(self):
        self.channel.basic.consume.cancel()
        self.channel.queue.unbind(queue=self.homeid, exchange='homedaemon', routing_key=f'homedaemon.{self.homeid}.reports')
    
    def on_event(self, msg_data: amqpstorm.Message):
        actions:Dict[str, Any] = {
            'report': self.update_device,
            'init_device': self.init_device,
            'del_device': self.del_device
            }
        try:
            event = json.loads(msg_data.body)
            cmd:str = event.pop('cmd', '')
            print('cmd', event)
            if event.get('sid'):
                actions.get(cmd, self._command_not_found)(event)
        except json.JSONDecodeError as err:
                logger.error(f'json {err} : {msg_data.body}')
        except AttributeError as err:
                logger.error(f'AtrributeError {err} : {msg_data.body}')
    
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
        self.channel.queue.unbind(self.homeid, 'homedaemon', routing_key=f'homedaemon.{self.homeid}.reports')


if __name__ == '__main__':
    config = JConfig()
    config.load_config_from_file('/etc/homedaemon/homed.json')
    watcher = MainWatcher(config)
    watcher.connect()
    