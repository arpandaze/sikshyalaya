import enum
import json
from datetime import datetime
from typing import Dict, List, Optional

from fastapi import WebSocket, websockets
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel

from core.db.redis_session import redis_chat_client
from core.security import get_uid_hash
from models import User


class ChatMessageTypes(enum.Enum):
    MESSAGE_HISTORY: int = 1
    PUBLIC_MESSAGE: int = 2
    ANON_MESSAGE: int = 3
    USER_JOINED: int = 4
    USER_LEFT: int = 5


class Message(BaseModel):
    msg_type: int
    data: Optional[str]
    user: Optional[str]
    time: datetime


class WebSocketManager:
    def __init__(self):
        self.connections: Dict = {}
        print(self.connections)

    async def update(self, data, key):
        msg = await redis_chat_client.client.get(key)
        if msg:
            msg = json.loads(msg)
        else:
            msg = []
        msg.append(data)
        await redis_chat_client.client.set(
            key, json.dumps(msg, separators=(",", ":")), expire=60 * 60 * 1000
        )

    async def connect(self, websocket: WebSocket, user_id: int, class_session_id: int):
        await websocket.accept()
        try:
            self.connections[class_session_id].append(websocket)
        except:
            self.connections.update({class_session_id: [websocket]})

        msg_instance = Message(
            msg_type=ChatMessageTypes.USER_JOINED.value,
            time=datetime.utcnow(),
            user=user_id,
        )

        chat_history = await redis_chat_client.client.get(
            f"chat_class_sess_{class_session_id}", encoding="UTF-8"
        )

        msg_history_instance = Message(
            msg_type=ChatMessageTypes.MESSAGE_HISTORY.value,
            data=chat_history,
            time=datetime.utcnow(),
        )
        await websocket.send_json(
            jsonable_encoder(msg_history_instance.dict(exclude_none=True))
        )

        await self.broadcast(
            msg_instance.dict(exclude_none=True), user_id, class_session_id
        )

    async def disconnect(
        self, websocket: WebSocket, user_id: int, class_session_id: int
    ):
        self.connections[class_session_id].remove(websocket)
        msg_instance = Message(
            msg_type=ChatMessageTypes.USER_LEFT.value,
            time=datetime.utcnow(),
            user=user_id,
        )
        await self.broadcast(msg_instance, user_id, class_session_id)

    async def broadcast(self, data: any, user_id: int, class_session_id: int):
        encoded_data = jsonable_encoder(data)
        for connection in self.connections.get(class_session_id):
            await connection.send_json(encoded_data)

        await self.update(encoded_data, f"chat_class_sess_{class_session_id}")

    async def message(
        self,
        websocket: WebSocket,
        message: str,
        user_id: int,
        class_session_id: int,
        anon: bool = False,
    ):
        msg_type = ChatMessageTypes.PUBLIC_MESSAGE.value
        user = user_id

        if anon:
            msg_type = ChatMessageTypes.ANON_MESSAGE.value
            user = get_uid_hash(user_id)

        msg_instance = Message(
            msg_type=msg_type,
            data=message,
            user=user,
            time=datetime.utcnow(),
        )
        await self.broadcast(
            msg_instance.dict(exclude_none=True), user_id, class_session_id
        )


ws = WebSocketManager()
