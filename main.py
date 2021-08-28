from fastapi import FastAPI, Request, WebSocket
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from services.counter import get_counter


app = FastAPI()

templates = Jinja2Templates(directory='templates')

app.mount("/static", StaticFiles(directory="static"), name="static")

FAKE_DB = [
    {'id': 1, 'data': 'Item 1'},
    {'id': 2, 'data': 'Item 2'},
    {'id': 3, 'data': 'Item 3'},
]


@app.get('/')
async def root(request: Request):
    return templates.TemplateResponse(name='index.html', context={'request': request, 'items': FAKE_DB})


@app.websocket('/websock')
async def root(websocket: WebSocket):
    await websocket.accept()
    counter = get_counter(FAKE_DB)
    while True:
        message = await websocket.receive_json()
        data = message.get('data').strip()
        if data:
            await websocket.send_json({"data-element": next(counter), "data": data})
