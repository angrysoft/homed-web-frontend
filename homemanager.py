#!/usr/bin/python
from __future__ import annotations

import json
import aioamqp
import asyncio
import ssl
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
         
        if 'couchdb' in config:
            self.db_connection = Client(
                f"http://{config['couchdb']['user']}:{config['couchdb']['password']}@"
                f"{config['couchdb']['url']}:{config['couchdb']['port']}")                                                       
        else:
            self.db_connection = Client("http://localhost")
            
        print(f'main watcher, {self.db_connection}')
        self.loop = asyncio.get_event_loop()
        self.loop.run_until_complete(self.connect())
        self.loop.run_forever()


    async def connect(self):
        while not self.connected and self.retry:
            try:
                context = ssl.create_default_context(cafile=self.config['cafile'])
                context.load_cert_chain(certfile=self.config['certfile'],
                                        keyfile=self.config['keyfile'],
                                        password=self.config['password'])
                
                self.transport, self.protocol = await aioamqp.connect(host=self.config['host'],
                                                                      port=self.config['port'],
                                                                      login=self.config['user'],
                                                                      password=self.config['user_password'],
                                                                      ssl=context)
                
                channel = await self.protocol.channel()
                await channel.exchange_declare('homedaemon', 'topic', auto_delete=False)
                await channel.queue_declare('main_queue')
                await channel.queue_bind('main_queue', 'homedaemon', routing_key='homedaemon.main')
                await channel.basic_consume(self.on_message, 'main_queue', no_ack=True)
                self.connected = True
            except aioamqp.AmqpClosedConnection as err:
                self.connected = False
                print(err)
                await asyncio.sleep(10)
                print('Retray after 5s')
    
    async def on_message(self, channel, body, envelope, properties):
        try:
            event = json.loads(body)
            cmd:str = event.get('cmd', '')
            if cmd == 'connect':
                print('connect: ', event)
                homeid:str = event.get('homeid', '')
                if homeid not in self.db_connection:
                    self.db_connection.create(homeid)
                self.homes[homeid] = HomeManager(channel, homeid, self.db_connection.get_db(homeid))
                await self.loop.create_task(self.homes[homeid].add_queues())
            else:
                print(event)
        except json.JSONDecodeError as err:
                logger.error(f'json {err} : {msg}')
                

class HomeManager:
    def __init__(self, channel: aioamqp.channel.Channel, homeid:str, db:Database) -> None:
        self.channel = channel
        self.homeid = homeid
        self.db: Database = db
        print('homemanager started')
    
    async def add_queues(self):
        await self.channel.queue_declare(self.homeid)
        await self.channel.queue_bind(self.homeid, 'homedaemon', routing_key=f'homedaemon.{self.homeid}.reports')
        await self.channel.basic_consume(self.on_event, self.homeid, no_ack=True)
    
    async def on_event(self, channel, body, envelope, properties):
        actions:Dict[str, Any] = {
            'report': self.update_device,
            'init_device': self.init_device,
            'del_device': self.del_device
            }
        try:
            event = json.loads(body)
            cmd:str = event.pop('cmd', '')
            print('cmd', event)
            if event.get('sid'):
                actions.get(cmd, self._command_not_found)(event)
        except json.JSONDecodeError as err:
                logger.error(f'json {err} : {body}')
        except AttributeError as err:
                logger.error(f'AtrributeError {err} : {body}')
    
    async def update_device(self, event:Dict[str, Any]) -> None:
        self.db[event['sid']] = event.get('data', {})
    
    async def init_device(self, event:Dict[str, Any]) -> None:
        if event['sid'] in self.db:
            self.db.delete(event['sid'])
        self.db[event['sid']] = event
    
    async def del_device(self, event:Dict[str, Any]) -> None:
        self.db.delete(event['sid'])
    
    async def _command_not_found(self, data:Dict[str, Any]) -> None:
        pass
    
    async def __del__(self):
        await self.channel.queue_unbind(self.homeid, 'homedaemon', routing_key=f'homedaemon.{self.homeid}.reports')


if __name__ == '__main__':
    config = JConfig()
    config.load_config_from_file('tmp/homed.json')
    watcher = MainWatcher(config)
    