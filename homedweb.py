#!/usr/bin/python
# Copyright (C) 2019-2021 Sebastian Zwierzchowski <sebastian.zwierzchowski@gmail.com>
#
# This program is free software; you can redistribute it and/or
# modify it under the terms of the GNU General Public License
# as published by the Free Software Foundation; either version 2
# of the License, or (at your option) any later version.

# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.

# You should have received a copy of the GNU General Public License
# along with this program; if not, write to the Free Software
# Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
from __future__ import annotations
import re
__author__ = 'Sebastian Zwierzchowski'
__copyright__ = 'Copyright 2019 - 2021 Sebastian Zwierzchowski'
__license__ = 'GPL2'
__version__ = '0.1'

import json
import os
import logging
from os import urandom
from starlette.applications import Starlette
from starlette.routing import Route, Mount
from starlette.requests import Request
from starlette.staticfiles import StaticFiles
from starlette.responses import JSONResponse, PlainTextResponse, Response
from starlette.templating import Jinja2Templates
from starlette.responses import Response
from starlette.middleware import Middleware
from starlette.middleware.sessions import SessionMiddleware
from starlette.middleware.authentication import AuthenticationMiddleware
from starlette.authentication import requires
from pycouchdb import Client
import uvicorn
from auth import AuthBackend
from typing import Dict, Any, List

conf_file = 'tmp/homed.json'
if not os.path.exists(conf_file):
    raise FileNotFoundError('can`find config file /etc/homerelay.json')

config: Dict[str, Any] ={}
with open(conf_file) as jfile:
    config = json.load(jfile)

db:Client  = Client(f"http://{config['db']['user']}:{config['db']['password']}@localhost")
templates = Jinja2Templates(directory='templates')


logging.basicConfig(filename='gast.log', filemode='w', format='%(asctime)s %(message)s', datefmt='%m/%d/%Y %H:%M:%S')
logging.warning('app starts')


# def login_required(func):
#     @wraps(func)
#     def decorated_function(*args, **kwargs):
#         if 'userid' not in session:
#             return redirect(url_for('login', next=request.url))
#         return func(*args, **kwargs)
#     return decorated_function


@requires('authenticated', redirect='signin')
async def home(request: Request) -> Response:
    homeid: str = request.path_params['homeid']
    if homeid == 'favicon.ico':
        return PlainTextResponse(homeid)
    # print(request.user.username, request.user.is_authenticated)
    return templates.TemplateResponse('home.html', {"request": request})


async def get_all_devices(request: Request) -> Response:
    ret: List[Dict[str,Any]] = []
    for item in db[request.path_params['homeid']].get_all_docs():
        ret.append(item)
    
    return JSONResponse(ret)


async def send_command(request: Request):
    print(await request.body())
    return PlainTextResponse("ok")


async def signin(request: Request):
    if request.method == 'GET':
        return templates.TemplateResponse('signin.html', {"request": request})
        # return PlainTextResponse("ok")
    elif request.method == 'POST':
        gs = GoogleSignin(await request.form(), request.session)
        return PlainTextResponse(gs.status)
    

routes: List[Any] = [
    Route('/home/{homeid:str}', endpoint=home),
    Route('/home/{homeid:str}/devices/all', endpoint=get_all_devices),
    Route('/home/{homeid:str}/devices/send', endpoint=send_command, methods=['POST']),
    Route('/signin', endpoint=signin, methods=['GET', 'POST']),
    Mount('/static', StaticFiles(directory='static'), name='static')
]


if config.get('debug', False):
    middleware = [
        Middleware(SessionMiddleware, secret_key=str(urandom(24))),
        Middleware(AuthenticationMiddleware, backend=GoogleAuthBackend())
    ]
else:
    middleware = [
        Middleware(SessionMiddleware, secret_key=str(urandom(24)), https_only=True),
        Middleware(AuthenticationMiddleware, backend=AuthBackend())
    ]
    
app = Starlette(routes=routes, debug=True, middleware=middleware)

if __name__ == "__main__":
    uvicorn.run(app, host='127.0.0.1',debug=True, port=8000)
