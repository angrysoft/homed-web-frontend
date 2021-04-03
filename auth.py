
from starlette.authentication import (
    AuthenticationBackend, AuthenticationError, SimpleUser, UnauthenticatedUser,
    AuthCredentials
)
from starlette.requests import HTTPConnection, Request
from typing import Tuple, Any
from google.oauth2 import id_token
from google.auth.transport import requests as g_requests

class AuthBackend(AuthenticationBackend):
    async def authenticate(self, conn: HTTPConnection) -> Tuple[Any, Any]:
        if 'userid' in conn.session:
            return AuthCredentials(["authenticated"]), SimpleUser(conn.session.get('userid', 'jondoe'))
        else:
            return AuthCredentials(), UnauthenticatedUser()


class GoogleSignin:
    def __init__(self, data, session) -> None:
        self._status = 'unsigned'
        token:str  = data.get('idtoken')
        try:
            # Specify the CLIENT_ID of the app that accesses the backend:
            idinfo = id_token.verify_oauth2_token(token, g_requests.Request(),
                                                  '877412399754-shou706hpt8q4llqenm6p93vthr4q28o.apps.googleusercontent.com')
            if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
                raise ValueError('Wrong issuer.')
            
            # ID token is valid. Get the user's Google Account ID from the decoded token.
            
            try:
                if idinfo['sub'] in db['residents']:
                    session['userid'] = idinfo['sub']
                    session['locale'] = idinfo['locale']
                    session['picture'] = idinfo['picture']
                    session['name'] = idinfo['name']
                    self._status = 'ok'
                else:
                    self._status = 'user not registered'
            except KeyError as err:
                self._status = f'db error {err}'
        except ValueError:
            self._status = 'Invalid token'
    
    @property
    def status(self):
        return self._status
    
    
            