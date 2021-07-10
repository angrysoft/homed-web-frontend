from typing import List, Set, Dict ,Any
import amqpstorm
from threading import Thread
import ssl
from time import sleep
import asyncio

class HomeManager(Thread):
    def __init__(self, config: Dict[str, Any]) -> None:
        super().__init__()
        # self.daemon = True
        self.config = config
        self.connection:amqpstorm.Connection
        self.channel:amqpstorm.Channel
        self.connected = False
        self.setuped:Set[str] = set()
        self.retry = True
        self.loop = True
        self.queues : Dict[str, EventQueue] = {}
    
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
    
    def start(self):
        print('Starting')
        self.channel.start_consuming()
        
    
    def register_home(self, homeid:str):
        if homeid in self.setuped:
            return
        queue_name = f'{homeid}_www'
        self.channel = self.connection.channel()
        self.channel.queue.declare(queue=queue_name)
        self.channel.queue.bind(queue=queue_name, exchange='homedaemon', routing_key=f'homedaemon.{homeid}.reports')
        self.channel.basic.consume(self.on_event, queue=queue_name, no_ack=True)
        self.setuped.add(homeid)
        print(f'add queue {queue_name}')
        if not self.is_alive:
            self.start()
            
        if homeid not in self.queues:
            self.queues[homeid] = EventQueue()
    
    def on_event(self, msg_data:amqpstorm.Message):
        if self.queue:
            self.queue.put(msg_data.body)
        print(msg_data.body)
    
    async def get_msg_from_queue(self, homeid:str):
        if homeid in self.queues:
            return await self.queues[homeid].get()
    
    async def set_block_state_msg_queue(self, homeid:str, state:bool):
        
        if homeid in self.queues:
            self.queues[homeid].block = True
    
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

  
class EventQueue:
    def __init__(self) -> None:
        self.lock: asyncio.Lock = asyncio.Lock()
        self._queue:List[str] = []
        self._event = asyncio.Event()
        self._block = False
    
    @property
    def block(self) -> bool:
        return self._block
     
    @block.setter
    def block(self, state:bool):
        self._block = state   
    
    async def put(self, item:str) -> None:
        async with self.lock:
            if self._block:
                return
            self._queue.insert(0, item)
            if not self._event.is_set():
                self._event.set()
            
    async def get(self) -> str:
        ret:str  = ''
        if self.is_empty():
            await self._event.wait()
               
        async with self.lock:
            ret = self._queue[-1]
        
        return ret
    
    async def is_empty(self) -> bool:
        return len(self._queue) == 0