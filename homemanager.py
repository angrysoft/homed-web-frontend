#!/usr/bin/python
from __future__ import annotations
import json
import os
from typing import Dict, Any
import logging
from systemd.journal import JournalHandler

from pycouchdb import Client, Database
import paho.mqtt.client as mqtt

logger = logging.getLogger("homemanager")
logger.addHandler(JournalHandler())
logger.setLevel(logging.DEBUG)


class JConfig:
    def __init__(self) -> None:
        self._config: Dict[str, Any] = {}

    def load_config_from_file(self, path: str):
        with open(path) as conf_file:
            self._config = json.load(conf_file)

    def get(self, key: str, default: None | Any = None) -> Any:
        if key in self._config:
            return self._config[key]
        else:
            return default

    def keys(self):
        return self._config.keys()

    def __getitem__(self, key: str) -> Any:
        return self.get(key)

    def __str__(self):
        return str(self._config)

    def __contains__(self, item: str):
        return item in self._config


class HomeManager:
    def __init__(self, config: JConfig):
        self.config: JConfig = config
        self._connected = False
        self._client: mqtt.Client = mqtt.Client()
        self._client.on_connect = self._on_connect
        self._client.on_message = self._on_message
        self._client.on_disconnect = self._on_disconnect
        if {"user", "password"}.issubset(self.config.get("mqtt", {}).keys()):
            self._client.username_pw_set(
                username=self.config["mqtt"]["user"],
                password=self.config["mqtt"]["password"],
            )
        self._client.tls_set()
        self._client.connect(
            host=self.config.get("mqtt", {}).get("host", "localhost"),
            port=self.config.get("mqtt", {}).get("port", 1883),
            keepalive=self.config.get("mqtt", {}).get("keepalive", 60),
        )

        self.topics: Dict[str, Dict[str, str]] = {
            f'homed/{c["id"]}/get': c for c in self.config["houses"]
        }

        self.db_connection: Client
        if "couchdb" in config:
            self.db_connection = Client(
                f"http://{config['couchdb']['user']}:{config['couchdb']['password']}@"
                f"{config['couchdb']['url']}:{config['couchdb']['port']}"
            )
        else:
            self.db_connection = Client("http://localhost")

    def _on_connect(
        self, client: mqtt.Client, userdata: Any, flags: Any, rc: Any
    ) -> None:
        self._connected = True
        client.subscribe(
            [(f'homed/{c["id"]}/get', 1) for c in self.config["houses"]]
        )

    def _on_message(self, client: mqtt.Client, userdata: Any, msg: mqtt.MQTTMessage):
        homeid = self.topics.get(msg.topic, {})
        actions: Dict[str, Any] = {
            "report": self.update_device,
            "init_device": self.init_device,
            "del_device": self.del_device,
        }
        try:
            event = json.loads(msg.payload)
            cmd: str = event.pop("cmd", "")
            print("cmd", event)
            if event.get("sid"):
                actions.get(cmd, self._command_not_found)(event, homeid["id"])
        except json.JSONDecodeError as err:
            logger.error(f"json {err} : {msg.payload}")
        except AttributeError as err:
            logger.error(f"AtrributeError {err} : {msg.payload}")

    def _on_disconnect(self, client: mqtt.Client, userdata: Any, rc: Any):
        self._connected = False
        if rc != 0:
            client.reconnect()

    def publish_msg(self, payload: Dict[str, Any]) -> None:
        if self._connected:
            self._client.publish(
                f'homed/{self.config["homed"]["id"]}/get', json.dumps(payload),
                qos=1
            )

    def update_device(self, event: Dict[str, Any], homeid: str) -> None:
        db = self.db_connection.get_db("homeid")
        db[event["sid"]] = event.get("data", {})

    def init_device(self, event: Dict[str, Any], homeid: str) -> None:
        db = self.db_connection.get_db("homeid")
        if event["sid"] in db:
            db.delete(event["sid"])
        db[event["sid"]] = event

    def del_device(self, event: Dict[str, Any], homeid: str) -> None:
        db = self.db_connection.get_db("homeid")
        self.db.delete(event["sid"])

    def _command_not_found(self, data: Dict[str, Any], homeid: str) -> None:
        pass

    def run(self):
        self._client.loop_forever()


if __name__ == "__main__":
    print(os.environ.get("CONF_FILE", "/etc/homedaemon/homemanager.json"))
    config = JConfig()
    config.load_config_from_file(
        os.environ.get("CONF_FILE", "/etc/homedaemon/homemanager.json")
    )
    hm = HomeManager(config)
    hm.run()
