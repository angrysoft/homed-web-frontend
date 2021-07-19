from typing import List, NoReturn, Set, Dict ,Any
import amqpstorm
from threading import RLock, Event
import ssl
from time import sleep

class HomeManager:
    def __init__(self, config: Dict[str, Any]) -> None:
        # super().__init__()
        # self.daemon = True
        self.config = config
        self.connection:amqpstorm.Connection
        self.channel:amqpstorm.Channel
        self.connected = False
        self.setuped:Set[str] = set()
        self.retry = True
        self.loop = True
        self.event_handlers : Dict[str, EventHandler] = {}
    
    def connect(self):
        if self.connected:
            return
        while not self.connected and self.retry:
            try:
                context = ssl.create_default_context(cafile=self.config['cafile'])
                context.load_cert_chain(certfile=self.config['certfile'],
                                        keyfile=self.config['keyfile'],
                                        password=self.config['password'])
                self.ssl_options = {'context': context,
                                    'check_hostname': True,
                                    'server_hostname': self.config['host']}
                
                self.connection:amqpstorm.Connection = amqpstorm.Connection(hostname=self.config['host'],
                                                                            username=self.config['user'],
                                                                            password=self.config['user_password'],
                                                                            port=self.config['port'],
                                                                            ssl=self.config['ssl'],
                                                                            ssl_options=self.ssl_options)
                
                self.connected = True
            except amqpstorm.AMQPConnectionError as err:
                self.connected = False
                print(err)
                sleep(5)
                print('Retray after 5s')
    
    def run(self) -> NoReturn:
        self.connect()
        while True:
            if self.setuped:
                self.channel.start_consuming()
            sleep(2)
    
    def register_home(self, homeid:str):
        if homeid in self.setuped:
            return
        queue_name = f'{homeid}_www'
        event_handler = EventHandler(homeid)
        
        self.channel = self.connection.channel()
        self.channel.exchange.declare(exchange='homedaemon', exchange_type='topic', auto_delete=False)
        self.channel.queue.declare(queue=queue_name)
        self.channel.queue.bind(queue=queue_name, exchange='homedaemon', routing_key=f'homedaemon.{homeid}.reports')
        self.channel.basic.consume(callback=event_handler, queue=queue_name, no_ack=True, arguments={'homeid':homeid})
        self.setuped.add(homeid)
        # if not self.is_alive():
        #     self.start()
            
        if homeid not in self.event_handlers:
            self.event_handlers[homeid] = event_handler
    
    def get_msg_from_queue(self, homeid:str):
        if homeid in self.event_handlers:
            self.set_block_state_msg_queue(homeid, False)
            return self.event_handlers[homeid].queue.get()
    
    def set_block_state_msg_queue(self, homeid:str, state:bool):
        
        if homeid in self.event_handlers:
            self.event_handlers[homeid].queue.block = state
    
    def publish_msg(self, msg:str, homeid:str) -> None:
        routing_key = f"homedaemon.{homeid}.in"
        
        if self.connected and homeid in self.setuped:
            properties = {'content_type': 'text/plain'}
            
            # try:
            #     txt_msg:str = json.dumps(msg_data)
            # except json.JSONDecodeError as err:
            #     print(f'json {err} : {msg_data}')
            #     return
            
            message: amqpstorm.Message = amqpstorm.Message.create(self.channel, msg, properties)
            message.publish(exchange='homedaemon', routing_key=routing_key)


    def stop(self):
        print('stopping')
        self.retry = False
        self.loop = False
        self.channel.close()

 
class EventHandler:
    def __init__(self, homeid:str) -> None:
        self.homeid = homeid
        self.queue = EventQueue()
    
    def __call__(self, msg_data:amqpstorm.Message) -> Any:
        self.queue.put(msg_data.body)
  
class EventQueue:
    def __init__(self) -> None:
        self.lock: RLock = RLock()
        self._queue:List[str] = []
        self._event = Event()
        self._block = False
    
    @property
    def block(self) -> bool:
        return self._block
     
    @block.setter
    def block(self, state:bool):
        self._block = state   
    
    def put(self, item:str) -> None:
        if self._block:
            return
        
        with self.lock:
            self._queue.insert(0, item)
            
    def get(self) -> str:
        ret:str  = ''
        with self.lock:
            if self._queue:
                ret = self._queue.pop()
        return ret
    
    def is_empty(self) -> bool:
        with self.lock:
            return len(self._queue) == 0
