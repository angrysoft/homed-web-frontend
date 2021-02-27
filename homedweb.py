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
from typing import Dict
__author__ = 'Sebastian Zwierzchowski'
__copyright__ = 'Copyright 2019 Sebastian Zwierzchowski'
__license__ = 'GPL2'
__version__ = '0.1'

import json
import os
import logging
from starlette.applications import Starlette
from starlette.routing import Route, Mount
from starlette.requests import Request
from starlette.staticfiles import StaticFiles
from starlette.responses import JSONResponse, PlainTextResponse
from starlette.templating import Jinja2Templates
from pycouchdb import Server
import uvicorn
from typing import Dict, Any, List

conf_file = 'homedweb.json'
if not os.path.exists(conf_file):
    raise FileNotFoundError('can`find config file /etc/homerelay.json')

config ={}
with open(conf_file) as jfile:
    config = json.load(jfile)

db: Server = Server(user=config['db']['user'], password=config['db']['password'])
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


# @login_required
async def home(request: Request) -> _TemplateResponse:
    homeid: str = request.path_params['homeid']
    if homeid == 'favicon.ico':
        return PlainTextResponse(homeid)
    print(request.headers.get("accept-language"))
    return templates.TemplateResponse('home.html', {"request": request})


async def get_all_devices(request: Request):
    ret: List[Dict[str,Any]] = []
    for item in db[request.path_params['homeid']].get_all_docs():
        ret.append(item.get_dict())
    
    return JSONResponse(ret)


async def send_command(request: Request):
    print(request)
    return PlainTextResponse("ok")


routes: List[Any] = [
    Route('/{homeid:str}', home),
    Route('/{homeid:str}/devices/all', get_all_devices),
    Route('/{homeid:str}/devices/send', send_command, methods=['POST']),
    Mount('/static', StaticFiles(directory='static'), name='static')
]

app = Starlette(routes=routes, debug=True)
# app.mount('/static', StaticFiles(directory='static'), name='static')

if __name__ == "__main__":
    uvicorn.run(app, host='127.0.0.1',debug=True, port=8000)
