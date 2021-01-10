#!/usr/bin/python
import json
import amqp
from typing import Dict, Any
from time import sleep

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
    

class MainWatcher:
    def __init__(self, config: JConfig) -> None:
        self.config = config
        self.connection = None
        self.connected = False
        self.sslopts = {'certfile': self.config['rabbitmq']['certfile'],
                        'keyfile': self.config['rabbitmq']['keyfile'],
                        'cafile': self.config['rabbitmq']['cafile'],
                        'password': self.config['rabbitmq']['password'],
                        "server_hostname": self.config['rabbitmq']['host']}
    
    def connect(self):
        while not self.connected:
            try:
                self.connection = amqp.Connection(f"{self.config['rabbitmq']['host']}:{self.config['rabbitmq']['port']}",
                                                  userid=self.config['rabbitmq']['user'], password=self.config['rabbitmq']['user_password'],
                                                  ssl=self.config['rabbitmq']['ssl'], ssl_options=self.sslopts, login_method='AMQPLAIN')
                channel = self.connection.channel()
                channel.queue_declare('homedaemon')
                channel.basic_consume(queue='homedaemon', callback=self.on_message, no_ack=True)
                self.connected = True
            except ConnectionRefusedError:
                self.connected = False
            sleep(10)
            print('Retray after 5s')
    
    def on_message(self, msg:Any):
        print(f"{msg.delivery_tag}:{msg.body}")
    
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
             


if __name__ == '__main__':
    config = JConfig()
    config.load_config_from_file('homedb.json')
    watcher = MainWatcher(config)
    watcher.run()