"""
This type stub file was generated by pyright.
"""

class HTMLResponse:
    def __init__(self, content, status_code) -> None: ...
    async def __call__(self, scope, recieve, send): ...

class PlainTextResponse:
    def __init__(self, content, status_code) -> None: ...
    async def __call__(self, scope, recieve, send): ...

def get_accept_header(scope): ...

class DebugMiddleware:
    def __init__(self, app) -> None: ...
    async def __call__(self, scope, receive, send): ...