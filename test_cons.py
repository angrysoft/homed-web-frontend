#!/usr/bin/python

import amqp
from time import sleep
import datetime
from homemanager import JConfig

config = JConfig()
config.load_config_from_file('homedb.json')
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
        print(f'sending msg {msg_no}')
        ch.basic_publish(amqp.Message(f"{msg_no} {datetime.datetime.now()}"), routing_key='homedaemon')
        msg_no += 1
        sleep(10)
