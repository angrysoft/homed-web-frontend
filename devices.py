import json
from typing import List, Dict, Any
from threading import RLock, Event
import paho.mqtt.client as mqtt
from pycouchdb import Client


class HomeManager:
    def __init__(self, homeid: str, config: Dict[str, Any]):
        self.home_queue: EventQueue = EventQueue()
        self.homeid = homeid
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
        client.subscribe(f"homed/{self.homeid}/get")

    def _on_message(self, client: mqtt.Client, userdata: Any, msg: mqtt.MQTTMessage):
        try:
            event = json.loads(msg.payload)
            if event.get("sid") and event.get("cmd") == "report":
                self.home_queue.put(json.dumps(event))
        except json.JSONDecodeError as err:
            print(f"json {err} : {msg.payload}")
        except AttributeError as err:
            print(f"AttributeError {err} : {msg.payload}")

    def _on_disconnect(self, client: mqtt.Client, userdata: Any, rc: Any):
        self._connected = False

    def get_msg_from_queue(self):
        return self.home_queue.get()

    def publish_msg(self, payload: str) -> None:
        if self._connected:
            self._client.publish(f"homed/{self.homeid}/set", payload, qos=1)

    def stop(self):
        self._client.disconnect()
        self.home_queue.clear()

    def run(self):
        self._client.loop_forever()


class EventQueue:
    def __init__(self) -> None:
        self.lock: RLock = RLock()
        self._queue: List[str] = []
        self._event = Event()

    def put(self, item: str | bytes) -> None:

        with self.lock:
            if isinstance(item, bytes):
                item = item.decode()
            self._queue.insert(0, f"{item}\n\n")

    def get(self) -> str:
        ret: str = ""
        with self.lock:
            if self._queue:
                ret = self._queue.pop()
        return ret

    def clear(self):
        self._queue.clear()
