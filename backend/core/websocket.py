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
    ACTIVE_USER_LIST: int = 6


class Message(BaseModel):
    msg_type: int
    data: Optional[str]
    user: Optional[str]
    time: datetime


class WebSocketManager:
    def __init__(self):
        self.connections: Dict = {}

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

    async def send_history(self, websocket: WebSocket, class_session_id: int):
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

        # self.send_history(websocket=websocket, class_session_id=class_session_id)

        await self.broadcast(
            msg_instance.dict(exclude_none=True), user_id, class_session_id, save=False
        )

        pre_status = await redis_chat_client.client.get(
            f"active_status_{class_session_id}", encoding="UTF-8"
        )

        active_user_instance = Message(
            msg_type=ChatMessageTypes.ACTIVE_USER_LIST.value,
            data=pre_status,
            time=datetime.utcnow(),
        )

        # print(active_user_instance.dict(exclude_none=True))
        await websocket.send_json(
            jsonable_encoder(active_user_instance.dict(exclude_none=True))
        )

        if not pre_status:
            pre_status_obj = []
        else:
            pre_status_obj = json.loads(pre_status)

        pre_status_obj.append(user_id)
        pre_status_obj = list(set(pre_status_obj))
        await redis_chat_client.client.set(
            f"active_status_{class_session_id}",
            json.dumps(pre_status_obj, separators=(",", ":")),
        )

        await redis_chat_client.client.expire(
            f"active_status_{class_session_id}",
            60 * 60 * 1000,
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

        await self.broadcast(msg_instance, user_id, class_session_id, save=False)
        pre_status = json.loads(
            await redis_chat_client.client.get(f"active_status_{class_session_id}")
        )

        pre_status.remove(user_id)
        await redis_chat_client.client.set(
            f"active_status_{class_session_id}",
            json.dumps(pre_status, separators=(",", ":")),
        )

        await redis_chat_client.client.expire(
            f"active_status_{class_session_id}",
            60 * 60 * 1000,
        )

    async def broadcast(
        self, data: any, user_id: int, class_session_id: int, save: bool = True
    ):
        encoded_data = jsonable_encoder(data)
        for connection in self.connections.get(class_session_id):
            try:
                await connection.send_json(encoded_data)
            except Exception as e:
                pass

        if save:
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
