import json
from typing import List, NoReturn, Set, Dict, Any
from threading import RLock, Event
import ssl
import paho.mqtt.client as mqtt


class HomeManager:
    def __init__(self, config: Dict[str, Any]):
        self.registered_homes: Set[str] = set()
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
        client.subscribe([(f'homed/{c["id"]}/get', 1) for c in self.config["houses"]])

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

    def run(self):
        self._client.loop_forever()

    def register_home(self, homeid: str):
        if homeid in self.registered_homes:
            return
        event_handler = EventHandler(homeid)
        self._client.subscribe(f'homed/{"homeid"}/get', qos=1)

        self.registered_homes.add(homeid)

        if homeid not in self.event_handlers:
            self.event_handlers[homeid] = event_handler

    def get_msg_from_queue(self, homeid: str):
        if homeid in self.event_handlers:
            self.set_block_state_msg_queue(homeid, False)
            return self.event_handlers[homeid].queue.get()

    def set_block_state_msg_queue(self, homeid: str, state: bool):

        if homeid in self.event_handlers:
            self.event_handlers[homeid].queue.block = state

    def publish_msg(self, payload: Dict[str, Any], homeid: str) -> None:
        if self._connected:
            self._client.publish(
                f'homed/{self.config["homed"]["id"]}/get', json.dumps(payload), qos=1
            )


class EventHandler:
    def __init__(self, homeid: str) -> None:
        self.homeid = homeid
        self.queue = EventQueue()

    def __call__(self, msg: mqtt.MQTTMessage) -> Any:
        self.queue.put(msg.payload)


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
