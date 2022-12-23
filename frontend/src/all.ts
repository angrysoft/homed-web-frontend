export const allDevices: Array<{[key:string]: any}> = [
  {
        "_id": "0x000000000545b741",
        "_rev": "3532-25db52c3e49f88156efc0acd3a5495b3",
        "traits": [
            "OnOff",
            "ColorTemperature",
            "Dimmer",
            "Hsv",
            "Toggle",
            "Rgb"
        ],
        "commands": [
            "off",
            "on",
            "set_color",
            "set_rgb",
            "set_hsv",
            "set_bright",
            "toggle",
            "set_ct_pc"
        ],
        "icon": "light",
        "power": "off",
        "bright": 1,
        "ct_pc": 1,
        "rgb": 16750592,
        "hue": 36,
        "sat": "100",
        "sid": "0x000000000545b741",
        "name": {
            "en": "Bed Lamp",
            "pl": "Lampka nocna"
        },
        "place": {
            "en": "Bedroom",
            "pl": "Sypialnia"
        },
        "model": "bslamp1",
        "ip": "192.168.10.22",
        "port": "55443",
        "color_mode": 1,
        "ct": 1748,
        "nl_br": 1
    },
    {
        "_id": "0x0000000007200259",
        "_rev": "606-8677b3d4e1180850d607153fc6471bcd",
        "traits": [
            "OnOff",
            "Toggle",
            "ColorTemperature",
            "Dimmer"
        ],
        "commands": [
            "off",
            "on",
            "set_bright",
            "toggle",
            "set_ct_pc"
        ],
        "icon": "light",
        "power": "off",
        "bright": "1",
        "ct_pc": "0",
        "sid": "0x0000000007200259",
        "name": {
            "en": "Desk lamp",
            "pl": "Lampka biurkowa"
        },
        "place": {
            "en": "Living room",
            "pl": "Salon"
        },
        "model": "desklamp",
        "ip": "192.168.10.27",
        "port": "55443",
        "color_mode": "2",
        "ct": "0"
    },
    {
        "_id": "0x0000000007e7bae0",
        "_rev": "5785-7d49be1f8e848c25c01a3c0060254cd4",
        "traits": [
            "OnOff",
            "ColorTemperature",
            "Dimmer",
            "Hsv",
            "Toggle",
            "Rgb"
        ],
        "commands": [
            "off",
            "on",
            "set_color",
            "set_rgb",
            "set_hsv",
            "set_bright",
            "toggle",
            "set_ct_pc"
        ],
        "power": "off",
        "bright": 1,
        "ct_pc": 1,
        "rgb": "3583",
        "hue": "237",
        "sat": "100",
        "sid": "0x0000000007e7bae0",
        "name": {
            "en": "Floor Lamp",
            "pl": "Lampa Stojąca"
        },
        "place": {
            "en": "Living room",
            "pl": "Salon"
        },
        "model": "color",
        "ip": "192.168.10.11",
        "port": "55443",
        "color_mode": "2",
        "ct": 1748
    },
    {
        "_id": "0x0000000013f0bc44",
        "_rev": "3106-b841d759b9d5d693eb775bcad86905c3",
        "traits": [
            "Dimmer",
            "Toggle",
            "OnOff"
        ],
        "commands": [
            "off",
            "toggle",
            "set_bright",
            "on"
        ],
        "power": "off",
        "bright": 40,
        "sid": "0x0000000013f0bc44",
        "name": {
            "en": "Hall Ball",
            "pl": "Korytarz żarówka"
        },
        "place": {
            "en": "Hall",
            "pl": "Korytarz"
        },
        "model": "mono5",
        "ip": "192.168.10.10",
        "port": "55443",
        "color_mode": "2"
    },
    {
        "_id": "0x00124b001f4502db",
        "_rev": "6299-4e6c8d1db8b404ef3153229966c3a74d",
        "traits": [],
        "commands": [],
        "sid": "0x00124b001f4502db",
        "name": {
            "en": "Button",
            "pl": "Guzik"
        },
        "place": {
            "en": "Livin room",
            "pl": "Salon"
        },
        "model": "",
        "voltage": 2900,
        "linkquality": 58,
        "short_id": "0",
        "low_voltage": "2800",
        "battery": 80,
        "last_seen": "2022-11-05T11:47:01+01:00"
    },
    {
        "_id": "0x00124b0022431c36",
        "_rev": "78197-44cb489cfa3b2d1dddb12080f9fe472d",
        "traits": [
            "Contact"
        ],
        "commands": [],
        "contact": false,
        "sid": "0x00124b0022431c36",
        "name": {
            "en": "Bathroom door",
            "pl": "Drzwi Łazienka"
        },
        "place": {
            "en": "Bathroom",
            "pl": "Łazienka"
        },
        "model": "",
        "voltage": 2900,
        "linkquality": 120,
        "short_id": "0",
        "low_voltage": "2800",
        "battery": 81.5,
        "battery_low": false,
        "last_seen": "2022-11-05T11:51:30+01:00",
        "tamper": false
    },
    {
        "_id": "0x00124b0022ec93cf",
        "_rev": "30550-6eaca63f4aa78cda0a26c544fd0b3098",
        "traits": [
            "MotionStatus"
        ],
        "commands": [],
        "occupancy": false,
        "sid": "0x00124b0022ec93cf",
        "name": {
            "en": "Movement Detector",
            "pl": "Czujnik ruchu"
        },
        "place": {
            "en": "Bathroom",
            "pl": "Łazienka"
        },
        "model": "",
        "voltage": 2900,
        "linkquality": 80,
        "short_id": "0",
        "low_voltage": "2800",
        "battery": 62,
        "battery_low": false,
        "last_seen": "2022-11-05T12:22:51+01:00",
        "tamper": false
    },
    {
        "_id": "0x00158d000200a020",
        "_rev": "28823-792490b7d22fcaba693226f9d8bc7ed3",
        "traits": [],
        "commands": [],
        "sid": "0x00158d000200a020",
        "name": {
            "en": "Switch",
            "pl": "Guzik"
        },
        "place": {
            "en": "Kitchen",
            "pl": "Kuchnia"
        },
        "model": "switch",
        "voltage": 3035,
        "linkquality": 127,
        "short_id": "0",
        "low_voltage": "2800",
        "battery": 100,
        "device_temperature": 23,
        "last_seen": "2022-11-05T12:14:49+01:00",
        "power_outage_count": 28,
        "temperature": 27,
        "action": "single"
    },
    {
        "_id": "0x00158d000208d668",
        "_rev": "14997-142d981caae01fa831ed653ed2ca3194",
        "traits": [
            "TemperatureStatus",
            "HumidityStatus"
        ],
        "commands": [],
        "temperature": 27.16,
        "humidity": 57.43,
        "sid": "0x00158d000208d668",
        "name": {
            "en": "Sensor",
            "pl": "Czujnik"
        },
        "place": {
            "en": "Bedroom",
            "pl": "Sypialnia"
        },
        "model": "sensor_ht",
        "voltage": 3185,
        "linkquality": 145,
        "short_id": "0",
        "low_voltage": "2800",
        "battery": 100,
        "last_seen": "2022-10-12T11:22:32+02:00",
        "power_outage_count": 65154
    },
    {
        "_id": "0x00158d00024e2e5b",
        "_rev": "303-952657bed2887a4ed4524265f5e6cce0",
        "traits": [
            "OnOff"
        ],
        "commands": [
            "off",
            "on"
        ],
        "power": "",
        "sid": "0x00158d00024e2e5b",
        "name": {
            "en": "Wall switch",
            "pl": "Włącznik"
        },
        "place": {
            "en": "Outside",
            "pl": "Na zewnątrz"
        },
        "model": "ctrl_neutral1",
        "voltage": "0",
        "linkquality": "0",
        "short_id": "0",
        "low_voltage": "2800",
        "channel_0": "",
        "state": ""
    },
    {
        "_id": "0x00158d00025d84a6",
        "_rev": "88377-347458e9ee293f5c9d13c61bec5ed9d3",
        "traits": [
            "TemperatureStatus",
            "HumidityStatus",
            "PressureStatus"
        ],
        "commands": [],
        "temperature": 18.15,
        "humidity": 73.57,
        "pressure": 1009.9,
        "sid": "0x00158d00025d84a6",
        "name": {
            "en": "Sensor",
            "pl": "Czujnik"
        },
        "place": {
            "en": "Outside",
            "pl": "Na zewnątrz"
        },
        "icon": "thermometer",
        "model": "weather.v1",
        "voltage": 2925,
        "linkquality": 120,
        "short_id": "0",
        "low_voltage": "2800",
        "battery": 50,
        "last_seen": "2022-10-28T14:53:51+02:00",
        "power_outage_count": 0
    },
    {
        "_id": "0x00158d00027d0065",
        "_rev": "759269-a170343446924e201d05273b16d91373",
        "traits": [
            "OnOff",
            "Toggle"
        ],
        "commands": [
            "off",
            "toggle",
            "on"
        ],
        "power": "OFF",
        "sid": "0x00158d00027d0065",
        "name": {
            "en": "Led strip",
            "pl": "Taśma led"
        },
        "place": {
            "en": "Kitchen",
            "pl": "Kuchnia"
        },
        "model": "plug",
        "voltage": "0",
        "linkquality": 131,
        "short_id": "0",
        "low_voltage": "2800",
        "status": "",
        "inuse": "",
        "power_consumed": 13.54,
        "load_power": 0,
        "device_temperature": 29,
        "energy": 13.54,
        "last_seen": "2022-11-05T12:27:18+01:00",
        "power_outage_memory": null,
        "update": {
            "state": "idle"
        },
        "update_available": false,
        "power_outage_count": 30,
        "temperature": 31
    },
    {
        "_id": "0x00158d000283b219",
        "_rev": "343777-ba144ab659b720f94b1cfcd1f676a2aa",
        "traits": [
            "OnOff",
            "Toggle"
        ],
        "commands": [
            "off",
            "toggle",
            "on"
        ],
        "power": "ON",
        "sid": "0x00158d000283b219",
        "name": {
            "en": "Socket",
            "pl": "Gniazdko"
        },
        "place": {
            "en": "Bedroom",
            "pl": "Sypialnia"
        },
        "model": "plug",
        "voltage": "0",
        "linkquality": 108,
        "short_id": "0",
        "low_voltage": "2800",
        "status": "",
        "inuse": "",
        "power_consumed": 1.06,
        "load_power": 16.03,
        "device_temperature": 45,
        "energy": 1.06,
        "last_seen": "2022-08-12T19:49:50+02:00",
        "power_outage_count": 36,
        "power_outage_memory": null,
        "temperature": 45,
        "update": {
            "state": "idle"
        },
        "update_available": false
    },
    {
        "_id": "0x00158d00029a49ba",
        "_rev": "993750-c96c71ceaffa8d2fe2a0142abdbe076e",
        "traits": [
            "MotionStatus",
            "IlluminanceStatus"
        ],
        "commands": [],
        "occupancy": false,
        "illuminance": 3,
        "sid": "0x00158d00029a49ba",
        "name": {
            "en": "Motion detector",
            "pl": "Czujnik ruchu"
        },
        "place": {
            "en": "Hall",
            "pl": "Korytarz"
        },
        "model": "sensor_motion.aq2",
        "voltage": 3155,
        "linkquality": 120,
        "short_id": "0",
        "low_voltage": "2800",
        "lux": "0",
        "battery": 100,
        "device_temperature": 28,
        "illuminance_lux": 3,
        "last_seen": "2022-11-05T12:23:37+01:00",
        "power_outage_count": 1540,
        "temperature": 32,
        "no_occupancy_since": 240
    },
    {
        "_id": "0x00158d00029b1929",
        "_rev": "630016-29c72b76c7b322aaec3b26a310d6ab99",
        "traits": [
            "DoubleSwitch"
        ],
        "commands": [
            "on",
            "off"
        ],
        "switches": "['left', 'right']",
        "sid": "0x00158d00029b1929",
        "name": {
            "en": "Wall switch",
            "pl": "Włącznik"
        },
        "place": {
            "en": "Living room",
            "pl": "Salon"
        },
        "model": "ctrl_neutral2",
        "voltage": 3300,
        "linkquality": 218,
        "short_id": "0",
        "low_voltage": "2800",
        "left": "OFF",
        "right": "OFF",
        "channel_0": "",
        "channel_1": "",
        "action": "release_right",
        "device_temperature": 29,
        "last_seen": "2022-11-05T12:27:06+01:00",
        "operation_mode_left": null,
        "operation_mode_right": null,
        "power_outage_count": 365,
        "temperature": 32,
        "update": {
            "state": "idle"
        },
        "update_available": false
    },
    {
        "_id": "0x00158d0002a13819",
        "_rev": "4825-81e4baf467a26773e853d0c093d1551d",
        "traits": [
            "Contact"
        ],
        "commands": [],
        "contact": true,
        "sid": "0x00158d0002a13819",
        "name": {
            "en": "Balcony doors",
            "pl": "Drzwi balkonowe"
        },
        "place": {
            "en": "Living room",
            "pl": "Salon"
        },
        "model": "magnet",
        "voltage": 3055,
        "linkquality": 91,
        "short_id": "0",
        "low_voltage": "2800",
        "battery": 100,
        "last_seen": "2022-10-11T15:13:41+02:00",
        "power_outage_count": 6
    },
    {
        "_id": "0x00158d0002a16338",
        "_rev": "1023670-43c4b74d846acb040c4d8bfdbe768804",
        "traits": [
            "DoubleSwitch"
        ],
        "commands": [
            "off",
            "on"
        ],
        "switches": "['left', 'right']",
        "sid": "0x00158d0002a16338",
        "name": {
            "en": "Wall switch",
            "pl": "Włącznik światła"
        },
        "place": {
            "en": "Bedroom",
            "pl": "Sypialnia"
        },
        "model": "ctrl_neutral2",
        "voltage": 3300,
        "linkquality": 120,
        "short_id": "0",
        "low_voltage": "2800",
        "left": "OFF",
        "right": "OFF",
        "channel_0": "",
        "channel_1": "",
        "device_temperature": 29,
        "last_seen": "2022-11-05T12:27:41+01:00",
        "operation_mode_left": "control_left_relay",
        "operation_mode_right": "control_right_relay",
        "power_outage_count": 181,
        "temperature": 32,
        "update": {
            "state": "idle"
        },
        "update_available": false,
        "action": "release_right"
    },
    {
        "_id": "0x00158d0002a18c2b",
        "_rev": "1365476-a306bf62e702e8c598ca60fcde83dc58",
        "traits": [
            "DoubleSwitch"
        ],
        "commands": [
            "off",
            "on"
        ],
        "icon": "lightbulb",
        "switches": "['left', 'right']",
        "sid": "0x00158d0002a18c2b",
        "name": {
            "en": "Wall switch",
            "pl": "Włącznik"
        },
        "place": {
            "en": "Hall",
            "pl": "Korytarz"
        },
        "model": "ctrl_neutral2",
        "voltage": 3300,
        "linkquality": 149,
        "short_id": "0",
        "low_voltage": "2800",
        "left": "OFF",
        "right": "ON",
        "channel_0": "",
        "channel_1": "",
        "device_temperature": 26,
        "last_seen": "2022-11-05T12:27:18+01:00",
        "operation_mode_left": null,
        "operation_mode_right": "decoupled",
        "update": {
            "state": "idle"
        },
        "update_available": false,
        "power_outage_count": 310,
        "temperature": 28,
        "action": "release_left"
    },
    {
        "_id": "0x00158d0002a67612",
        "_rev": "22240-dad658ae8e691de9aa954ec9400f8e5a",
        "traits": [
            "Contact"
        ],
        "commands": [],
        "contact": false,
        "sid": "0x00158d0002a67612",
        "name": {
            "en": "Window",
            "pl": "Okno"
        },
        "place": {
            "en": "Bedroom",
            "pl": "Sypialnia"
        },
        "model": "magnet",
        "voltage": 3005,
        "linkquality": 120,
        "short_id": "0",
        "low_voltage": "2800",
        "battery": 100,
        "last_seen": "2022-11-05T12:06:46+01:00",
        "power_outage_count": 92
    },
    {
        "_id": "0x00158d0002abac97",
        "_rev": "2946097-21cf7bc61a6981fea5285e7b820e79da",
        "traits": [
            "DoubleSwitch"
        ],
        "commands": [
            "off",
            "on"
        ],
        "switches": "['left', 'right']",
        "sid": "0x00158d0002abac97",
        "name": {
            "en": "Wall switch",
            "pl": "Włącznik światła"
        },
        "place": {
            "en": "Bathroom",
            "pl": "Łazienka"
        },
        "model": "ctrl_neutral2",
        "voltage": 3300,
        "linkquality": 127,
        "short_id": "0",
        "low_voltage": "2800",
        "left": "OFF",
        "right": "OFF",
        "channel_0": "",
        "channel_1": "",
        "device_temperature": 28,
        "operation_mode_left": null,
        "operation_mode_right": null,
        "power_outage_count": 172,
        "last_seen": "2022-11-05T12:27:11+01:00",
        "temperature": 30,
        "update": {
            "state": "idle"
        },
        "update_available": false,
        "action": "release_right"
    },
    {
        "_id": "0x00158d0002b74c28",
        "_rev": "40468-64968bdaf9a675eff4d694024903b87b",
        "traits": [
            "Contact"
        ],
        "commands": [],
        "contact": true,
        "sid": "0x00158d0002b74c28",
        "name": {
            "en": "Entrance Door",
            "pl": "Drzwi wejściowe"
        },
        "place": {
            "en": "Hall",
            "pl": "Korytarz"
        },
        "model": "magnet",
        "voltage": 3105,
        "linkquality": 87,
        "short_id": "0",
        "low_voltage": "2800",
        "battery": 100,
        "last_seen": "2022-11-05T12:08:39+01:00",
        "power_outage_count": 666
    },
    {
        "_id": "0x00158d0002bffe5a",
        "_rev": "711477-58e15157d8b050fe0f19bdd3fae62377",
        "traits": [
            "DoubleSwitch"
        ],
        "commands": [
            "off",
            "on"
        ],
        "switches": "['left', 'right']",
        "sid": "0x00158d0002bffe5a",
        "name": {
            "en": "Wall switch",
            "pl": "Włącznik światła"
        },
        "place": {
            "en": "Kitchen",
            "pl": "Kuchnia"
        },
        "model": "ctrl_neutral2",
        "voltage": 3300,
        "linkquality": 120,
        "short_id": "0",
        "low_voltage": "2800",
        "left": "OFF",
        "right": "OFF",
        "channel_0": "",
        "channel_1": "",
        "device_temperature": 26,
        "last_seen": "2022-11-05T12:26:56+01:00",
        "operation_mode_left": "control_left_relay",
        "operation_mode_right": "control_right_relay",
        "power_outage_count": 44,
        "temperature": 29,
        "update": {
            "state": "idle"
        },
        "update_available": false,
        "action": "release_right"
    },
    {
        "_id": "0x00158d0002c9d230",
        "_rev": "204082-29cb5ab9ff8e61a33d0e055cf8460a88",
        "traits": [
            "TemperatureStatus",
            "HumidityStatus",
            "PressureStatus"
        ],
        "commands": [],
        "temperature": 22.18,
        "humidity": 70.09,
        "pressure": 999.8,
        "sid": "0x00158d0002c9d230",
        "name": {
            "en": "Sensor",
            "pl": "Czujnik"
        },
        "place": {
            "en": "Bathroom",
            "pl": "Łazienka"
        },
        "model": "weather.v1",
        "voltage": 3045,
        "linkquality": 91,
        "short_id": "0",
        "low_voltage": "2800",
        "battery": 100,
        "last_seen": "2022-11-05T11:42:59+01:00",
        "power_outage_count": 0
    },
    {
        "_id": "0x00158d0002e966b9",
        "_rev": "186472-67ac53e2d8cb5dad118f90f45b732194",
        "traits": [
            "TemperatureStatus",
            "HumidityStatus",
            "PressureStatus"
        ],
        "commands": [],
        "temperature": 21.86,
        "humidity": 70.71,
        "pressure": 1002,
        "sid": "0x00158d0002e966b9",
        "name": {
            "en": "Sensor",
            "pl": "Czujnik"
        },
        "place": {
            "en": "Living room",
            "pl": "Salon"
        },
        "model": "weather.v1",
        "voltage": 2975,
        "linkquality": 171,
        "short_id": "0",
        "low_voltage": "2800",
        "battery": 83,
        "last_seen": "2022-11-05T10:40:04+01:00",
        "power_outage_count": 9
    },
    {
        "_id": "0x00158d0002ec03fe",
        "_rev": "991786-cc4406017a98f8576d88dc4f7ce9093f",
        "traits": [
            "MotionStatus",
            "IlluminanceStatus"
        ],
        "commands": [],
        "occupancy": false,
        "illuminance": 4,
        "sid": "0x00158d0002ec03fe",
        "name": {
            "en": "Motion detector",
            "pl": "Czujnik ruchu"
        },
        "place": {
            "en": "Bedroom",
            "pl": "Sypialnia"
        },
        "model": "sensor_motion.aq2",
        "voltage": 2995,
        "linkquality": 127,
        "short_id": "0",
        "low_voltage": "2800",
        "lux": "0",
        "battery": 97,
        "device_temperature": 28,
        "illuminance_lux": 4,
        "last_seen": "2022-11-05T12:10:21+01:00",
        "power_outage_count": 1371,
        "temperature": 30,
        "no_occupancy_since": 900
    },
    {
        "_id": "0x00158d0002ec2fa6",
        "_rev": "2679735-5395835ef9eede2e5b037957e1906fea",
        "traits": [
            "MotionStatus",
            "IlluminanceStatus"
        ],
        "commands": [],
        "occupancy": true,
        "illuminance": 4,
        "sid": "0x00158d0002ec2fa6",
        "name": {
            "en": "Motion detector",
            "pl": "Czujnik ruchu"
        },
        "place": {
            "en": "Living room",
            "pl": "Salon"
        },
        "model": "sensor_motion.aq2",
        "voltage": 2995,
        "linkquality": 127,
        "short_id": "0",
        "low_voltage": "2800",
        "lux": "0",
        "battery": 97,
        "device_temperature": 26,
        "illuminance_lux": 4,
        "last_seen": "2022-11-05T12:27:16+01:00",
        "power_outage_count": 7568,
        "temperature": 29,
        "no_occupancy_since": 60
    },
    {
        "_id": "0x00158d00033ef2d8",
        "_rev": "29552-2f65fe60a0d86003fbd5aa75a4572e77",
        "traits": [],
        "commands": [],
        "sid": "0x00158d00033ef2d8",
        "name": {
            "en": "Switch",
            "pl": "Guzik"
        },
        "place": {
            "en": "Bedroom",
            "pl": "Sypialnia"
        },
        "model": "switch",
        "voltage": 3032,
        "linkquality": 120,
        "short_id": "0",
        "low_voltage": "2800",
        "battery": 100,
        "last_seen": "2022-11-05T12:20:41+01:00",
        "power_outage_count": 67,
        "action": "release",
        "duration": 430
    },
    {
        "_id": "0x00158d00044638db",
        "_rev": "21847-5d4bd3b2403c05c58832d8a58e795eb4",
        "traits": [
            "Contact"
        ],
        "commands": [],
        "contact": true,
        "sid": "0x00158d00044638db",
        "name": {
            "en": "Window",
            "pl": "Okno"
        },
        "place": {
            "en": "Kitchen",
            "pl": "Kuchnia"
        },
        "model": "magnet",
        "voltage": 2995,
        "linkquality": 116,
        "short_id": "0",
        "low_voltage": "2800",
        "battery": 97,
        "last_seen": "2022-11-05T11:48:35+01:00",
        "power_outage_count": 113
    },
    {
        "_id": "0x04cf8cdf3c8a0236",
        "_rev": "305483-a6becc537c85953cbd49bcf42d900327",
        "traits": [
            "IlluminanceStatus"
        ],
        "commands": [],
        "illuminance": 18977,
        "sid": "0x04cf8cdf3c8a0236",
        "name": {
            "en": "Light Detector",
            "pl": "Miernik Światła"
        },
        "place": {
            "en": "Outside",
            "pl": "Na zewnątrz"
        },
        "model": "GZCGQ01LM",
        "voltage": 3100,
        "linkquality": 127,
        "short_id": "0",
        "low_voltage": "2800",
        "lux": 79,
        "battery": 100,
        "last_seen": "2022-11-05T12:24:11+01:00",
        "power_outage_count": null
    },
    {
        "_id": "1000b6063e",
        "_rev": "13225-024bbcf8720c31c8c93617cf1ebf76e9",
        "traits": [
            "OnOff"
        ],
        "commands": [
            "off",
            "on"
        ],
        "power": "off",
        "sid": "1000b6063e",
        "name": {
            "en": "Mirror Lamp",
            "pl": "Kinkiet"
        },
        "place": {
            "en": "Bathroom",
            "pl": "Łazienka"
        },
        "model": "diy_plug",
        "ip": "192.168.10.14",
        "port": "8081",
        "startup": "off",
        "pulse": "off",
        "pulseWidth": 500,
        "rrsi": "0",
        "ssid": "",
        "sledOnline": "on",
        "switch": "off",
        "rssi": -71
    },
    {
        "_id": "1000b6e1c8",
        "_rev": "1507-aafbf075ede265fa1e67038623dbcd79",
        "traits": [
            "OnOff"
        ],
        "commands": [
            "off",
            "on"
        ],
        "power": "off",
        "sid": "1000b6e1c8",
        "name": {
            "en": "Taras Lamp",
            "pl": "Lampa Tarasowa"
        },
        "place": {
            "en": "Outside",
            "pl": "Na zewnątrz"
        },
        "model": "diy_plug",
        "ip": "192.168.10.10",
        "port": "8081",
        "startup": "off",
        "pulse": "off",
        "pulseWidth": 500,
        "rrsi": "0",
        "ssid": "",
        "sledOnline": "on",
        "switch": "off",
        "rssi": -70
    },
    {
        "_id": "235444403",
        "_rev": "893-54892a14c18f323fa909f40eb6ab50a4",
        "traits": [
            "ColorTemperature",
            "Dimmer",
            "OnOff",
            "Scene"
        ],
        "commands": [
            "on",
            "off",
            "set_ct_pc",
            "set_bright",
            "set_scene"
        ],
        "icon": "light",
        "power": "on",
        "bright": 1,
        "ct_pc": 1,
        "scene": "1",
        "sid": "235444403",
        "name": {
            "en": "Johnie lamp",
            "pl": "Lampka Jaśka"
        },
        "place": {
            "en": "Bedroom",
            "pl": "Sypialnia"
        },
        "model": "",
        "cct": 1,
        "snm": "1"
    },
    {
        "_id": "568A6295FB9FE3648F78F0146D20E557749B32B7",
        "_rev": "12329-72339fbb5cf4e50199e471e6ab6f563f",
        "traits": [
            "OnOff",
            "Volume",
            "Arrows",
            "ButtonReturn",
            "ButtonOK",
            "Channels",
            "ButtonExit",
            "MediaButtons"
        ],
        "commands": [
            "off",
            "forward",
            "right",
            "set_volume",
            "channel_down",
            "stop",
            "rewind",
            "volume_down",
            "up",
            "pause",
            "exit",
            "down",
            "channel_up",
            "on",
            "ret",
            "play",
            "set_channel",
            "volume_up",
            "left",
            "ok"
        ],
        "power": "off",
        "volume": "",
        "channel": "",
        "sid": "568A6295FB9FE3648F78F0146D20E557749B32B7",
        "name": {
            "en": "Tv",
            "pl": "Telewizor"
        },
        "place": {
            "en": "Living room",
            "pl": "Salon"
        },
        "model": "",
        "ip": "192.168.10.5",
        "psk": "0000",
        "mac": "",
        "dispNum": ""
    },
    {
        "_id": "alarm",
        "_rev": "311-fea6983dcd56601bb658d78530b1b542",
        "status": "off",
        "sid": "alarm",
        "name": "alarm",
        "place": ""
    },
    {
        "_id": "bathroom",
        "_rev": "307-3c6bc09e583a2982e2759b125deaab5b",
        "status": "off",
        "sid": "bathroom",
        "name": "Bathroom events",
        "place": ""
    },
    {
        "_id": "bedroom",
        "_rev": "173-7170137558e32c796af0c32694dea213",
        "status": "off",
        "sid": "bedroom",
        "name": "bedroom motion",
        "place": ""
    },
    {
        "_id": "clock",
        "_rev": "715245-704a154851541f344915a7f1de7f792e",
        "traits": [],
        "commands": [],
        "sid": "clock",
        "name": {
            "en": "clock",
            "pl": "Zegar"
        },
        "place": {
            "en": "All",
            "pl": "Wszędzie"
        },
        "model": "",
        "sunrise": false,
        "sunset": false,
        "time": "12:27:31"
    },
    {
        "_id": "fan",
        "_rev": "1-075e536ad56330283803ad0ac817e872",
        "status": "off",
        "sid": "fan",
        "name": "Bathroom fan",
        "place": ""
    },
    {
        "_id": "goodbye",
        "_rev": "311-9b1b4d644310a4325cfc8a7314a5fb4b",
        "status": "off",
        "sid": "goodbye",
        "name": "goodbye",
        "place": "All"
    },
    {
        "_id": "goodnight",
        "_rev": "311-53533383d38b6c2ea621bcb9ebc960d7",
        "status": "off",
        "sid": "goodnight",
        "name": "good night",
        "place": "All"
    },
    {
        "_id": "hallmotion",
        "_rev": "311-d843497dea8073434f0c954c3292e376",
        "status": "off",
        "sid": "hallmotion",
        "name": "hall motion",
        "place": ""
    },
    {
        "_id": "kitchen_light",
        "_rev": "311-df94feb53dcd313a2fa5309c12e8023c",
        "status": "off",
        "sid": "kitchen_light",
        "name": "Kitchen Strip",
        "place": ""
    },
    {
        "_id": "light_switch",
        "_rev": "311-598a52d94f362957773427ef8835f258",
        "status": "off",
        "sid": "light_switch",
        "name": "Light Switch",
        "place": "Bedroom"
    },
    {
        "_id": "livingroommotion",
        "_rev": "311-be9ecf9a2663b13b986c7cc85fa3b04d",
        "status": "off",
        "sid": "livingroommotion",
        "name": "Livingroom motion",
        "place": "Living room"
    },
    {
        "_id": "movie",
        "_rev": "311-e86bab0a5b43e10520c3b9a129bce3c3",
        "status": "off",
        "sid": "movie",
        "name": "Movie",
        "place": "Living room"
    }
]