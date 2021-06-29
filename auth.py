
from starlette.authentication import (
    AuthenticationBackend, AuthenticationError, SimpleUser, UnauthenticatedUser,
    AuthCredentials
)
from starlette.requests import HTTPConnection
from typing import Tuple, Any, Dict
from google.oauth2 import id_token
from google.auth.transport import requests as g_requests

class AuthBackend(AuthenticationBackend):
    async def authenticate(self, conn: HTTPConnection) -> Tuple[Any, Any]:
        if 'userid' in conn.session:
            return AuthCredentials(["authenticated"]), SimpleUser(conn.session.get('name', 'jondoe'))
        else:
            return AuthCredentials(), UnauthenticatedUser()


class GoogleSignIn:
    def __init__(self, token:str) -> None:
        self._user_info:Dict[str,str] = {}
        self.token = token
        
    async def authenticate(self):
        try:
            # Specify the CLIENT_ID of the app that accesses the backend:
            self._user_info = id_token.verify_oauth2_token(self.token,
                                                           g_requests.Request(),
                                                           '877412399754-shou706hpt8q4llqenm6p93vthr4q28o.apps.googleusercontent.com')
            if self._user_info['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
                self._user_info.clear()
                raise ValueError('Wrong issuer.')
            
            # ID token is valid. Get the user's Google Account ID from the decoded token.
        except ValueError:
            self._status = 'Invalid token'
    
    @property
    def user_id(self) -> str:
        return self._user_info.get('sub', '')
    
    @property
    def locale(self) -> str:
        return self._user_info.get('locale', '')
    
    @property
    def picture(self) -> str:
        return self._user_info.get('picture', '')
    
    @property
    def name(self) -> str:
        return self._user_info.get('name', '')
    
   
        
            