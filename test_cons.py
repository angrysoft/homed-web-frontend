#!/usr/bin/python

import amqp
from time import sleep
import datetime
from homemanager import JConfig
import json

config = JConfig()
config.load_config_from_file('tmp/homedb.json')
sslopts = {'certfile': config['rabbitmq']['certfile'],
            'keyfile': config['rabbitmq']['keyfile'],
            'cafile': config['rabbitmq']['cafile'],
            'password': config['rabbitmq']['password'],
            "server_hostname": config['rabbitmq']['host']}

#conn = amqp.Connection("angrysoft.ovh:5671", userid="homed", password="uu9saTh3wok7", ssl=False, login_method='AMQPLAIN')
msg_no = 0
with amqp.Connection(f"{config['rabbitmq']['host']}:{config['rabbitmq']['port']}",
                     userid=config['rabbitmq']['user'], password=config['rabbitmq']['user_password'],
                     ssl=config['rabbitmq']['ssl'], ssl_options=sslopts, login_method='AMQPLAIN')as c:
    ch = c.channel()
    while True:
        msg = {"cmd":"test", "msg_id": msg_no, "time": str(datetime.datetime.now())}
        print(f'sending msg {msg}')
        ch.basic_publish(amqp.Message(json.dumps(msg)),exchange='homedaemon', routing_key='homedaemon.main')
        # ch.basic_publish(amqp.Message(json.dumps(msg)), routing_key='main_q')
        msg_no += 1
        sleep(5)
