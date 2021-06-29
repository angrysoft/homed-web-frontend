#!/usr/bin/python

from homemanager import JConfig
import asyncio
from devices import HomeManager

config = JConfig()
config.load_config_from_file('tmp/homed.json')
config = config['rabbitmq']
hm = HomeManager(config)



event_loop = asyncio.get_event_loop()
event_loop.run_until_complete(hm.connect())
event_loop.run_forever()