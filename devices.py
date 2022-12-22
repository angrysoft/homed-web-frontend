import json
from typing import List, Dict, Any
from threading import RLock, Event
import paho.mqtt.client as mqtt
from pycouchdb import Client


class HomeManager:
    def __init__(self, config: Dict[str, Any]):
        self.home_queues: Dict[str, EventQueue] = {}
        self.config: Dict[str, Any] = config
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
        for q in self.config["houses"]:
            if q["id"] not in self.home_queues:
                self.home_queues[q["id"]] = EventQueue()

        client.subscribe([(f'homed/{c["id"]}/get', 1) for c in self.config["houses"]])

    def _on_message(self, client: mqtt.Client, userdata: Any, msg: mqtt.MQTTMessage):
        homeid = self.topics.get(msg.topic, {}).get("id")

        try:
            event = json.loads(msg.payload)
            if event.get("sid") and event.get("cmd") == "report":
                self.home_queues[homeid].put(json.dumps(event))
        except json.JSONDecodeError as err:
            logger.error(f"json {err} : {msg.payload}")
        except AttributeError as err:
            logger.error(f"AtrributeError {err} : {msg.payload}")

    def _on_disconnect(self, client: mqtt.Client, userdata: Any, rc: Any):
        self._connected = False
        if rc != 0:
            client.reconnect()

    def get_msg_from_queue(self, homeid: str):
        if homeid in self.home_queues:
            self.set_block_state_msg_queue(homeid, False)
            return self.home_queues[homeid].get()

    def set_block_state_msg_queue(self, homeid: str, state: bool):
        if homeid in self.home_queues:
            self.home_queues[homeid].block = state

    def publish_msg(self, payload: Dict[str, Any], homeid: str) -> None:
        if self._connected:
            self._client.publish(
                f'homed/{homeid}/set', json.dumps(payload), qos=1
            )

    def run(self):
        self._client.loop_forever()


class EventQueue:
    def __init__(self) -> None:
        self.lock: RLock = RLock()
        self._queue: List[str | bytes] = []
        self._event = Event()
        self._block = False

    @property
    def block(self) -> bool:
        return self._block

    @block.setter
    def block(self, state: bool):
        self._block = state

    def put(self, item: str | bytes) -> None:
        if self._block:
            return

        with self.lock:
            self._queue.insert(0, item)

    def get(self) -> str | bytes:
        ret: str | bytes = ""
        with self.lock:
            if self._queue:
                ret = self._queue.pop()
        return ret

    def is_empty(self) -> bool:
        with self.lock:
            return len(self._queue) == 0
