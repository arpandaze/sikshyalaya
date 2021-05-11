from fastapi import WebSocket, websockets
from typing import List, Dict
import json


class WebSocketManager:
    def __init__(self):
        self.connections: Dict = {}

    async def connect(self, websocket: WebSocket, class_session_id: int):
        await websocket.accept()
        class_conns = self.connections.get(class_session_id)

        if not class_conns:
            self.connections.update({class_session_id: []})
            class_conns = self.connections.get(class_session_id)

        class_conns.append(websocket)

    def disconnect(self, websocket: WebSocket, class_session_id: int):
        self.connections.get(class_session_id).remove(websocket)

    async def respond(self, message: json, websocket: WebSocket):
        await websocket.send_json(message)

    async def broadcast(self, data: json, class_session_id: int):
        for connection in self.connections.get(class_session_id):
            await connection.send_json(data)


ws = WebSocketManager()
