import os
import json
import aiofiles
from typing import Any, List
from core.security import get_uid_hash

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from utils import deps
from cruds import crud_class_session, crud_user
from schemas import ClassSession, ClassSessionUpdate, ClassSessionCreate
from utils.deps import get_current_active_teacher_or_above, get_current_active_user

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import FileResponse
from core.config import settings
from models import ClassSession as ClassSessionModel
from typing import List

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse
from core.websocket import ws

router = APIRouter()


@router.get("/", response_model=List[ClassSession])
def get_class_session(
    db: Session = Depends(deps.get_db),
    user=Depends(get_current_active_user),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    class_sessions = crud_class_session.get_user_class_session(db, user=user)
    return class_sessions


@router.post("/", response_model=ClassSession)
def create_class_session(
    db: Session = Depends(deps.get_db),
    user=Depends(get_current_active_teacher_or_above),
    *,
    obj_in: ClassSessionCreate,
) -> Any:
    class_session = crud_class_session.create(db, obj_in=obj_in)
    return class_session


@router.get("/{id}", response_model=ClassSession)
def get_specific_class_session(
    db: Session = Depends(deps.get_db),
    user=Depends(get_current_active_user),
    *,
    id: int,
) -> Any:
    class_session = crud_class_session.get_user_class_session(db=db, user=user, id=id)
    return class_session


@router.put("/{id}", response_model=ClassSession)
def update_class_session(
    db: Session = Depends(deps.get_db), *, id: int, obj_in: ClassSessionUpdate
) -> Any:
    class_session = crud_class_session.get(db, id)
    class_session = crud_class_session.update(db, db_obj=class_session, obj_in=obj_in)
    return class_session


@router.post("/{id}/file/")
async def create_upload_files(
    db: Session = Depends(deps.get_db),
    files: List[UploadFile] = File(...),
    current_teacher=Depends(
        get_current_active_teacher_or_above
    ),  # FIXME : Get current user ?
    *,
    id: int,
):
    class_session = crud_class_session.get_user_class_session(
        db=db, user=current_teacher, id=id
    )

    if not class_session:
        raise HTTPException(status_code=401, detail="Error ID: 100")  # Access denied!

    for file in files:
        filename = f"{settings.UPLOAD_DIR_ROOT}/{id}/{file.filename}"
        async with aiofiles.open(filename, mode="wb") as f:
            content = await file.read()
            await f.write(content)

    obj_in = ClassSessionUpdate(file=[file.filename for file in files])
    print(obj_in)
    crud_class_session.update(db=db, db_obj=class_session, obj_in=obj_in)

    return {"msg": "success"}


@router.get("{id}/file/{filename}")  # TODO: File caching
async def get_upload_files(
    db: Session = Depends(deps.get_db),
    req_user=Depends(get_current_active_user),
    *,
    filename: str,
    id: int,
):
    class_session = crud_class_session.get_user_class_session(
        db=db, user=req_user, id=id
    )
    if not class_session:
        raise HTTPException(status_code=401, detail="Error ID: 101")  # Access denied!
    file = FileResponse(f"{settings.UPLOAD_DIR_ROOT}/{id}/{filename}")
    return file


html = """
<!DOCTYPE html>
<html>
    <head>
        <title>Chat</title>
    </head>
    <body>
        <h1>WebSocket Chat</h1>
        <form action="" onsubmit="sendMessage(event)">
            <input type="text" id="messageText" autocomplete="off"/>
            <button>Send</button>
        </form>
        <ul id='messages'>
        </ul>
        <script>
            var ws = new WebSocket("ws://localhost:8080/api/v1/class_session/ws/8");
            ws.onmessage = function(event) {
                data = JSON.parse(event.data)
                console.log(data)
                if(data.type === "info"){
                    console.log(data.status)
                }
                else{
                    var messages = document.getElementById('messages')
                    var message = document.createElement('li')
                    var content = document.createTextNode(`${data.name} : ${data.message}`)
                    message.appendChild(content)
                    messages.appendChild(message)
                }
            };
            function sendMessage(event) {
                var input = document.getElementById("messageText")
                data = {
                    "type":"message",
                    "message":input.value,
                    "anon":true,
                }
                ws.send(JSON.stringify(data))
                input.value = ''
                event.preventDefault()
            }
        </script>
    </body>
</html>
"""


@router.websocket("/ws/{id}")
async def websocket_endpoint(
    db: Session = Depends(deps.get_db),
    *,
    websocket: WebSocket,
    req_user=Depends(get_current_active_user),
    id: int,
):
    class_session = crud_class_session.get_user_class_session(
        db=db, user=req_user, id=id
    )
    if not class_session:
        raise HTTPException(
            status_code=403, detail="Error Code: 144"
        )  # User doesn't have access to classsession
    await ws.connect(websocket, class_session_id=id)
    try:
        while True:
            data = await websocket.receive_json()
            await ws.respond({"type": "info", "status": "success"}, websocket)
            res_data = {
                "user": req_user.id,
                "name": req_user.full_name,
                "type": "message",
                "message": data.get("message"),
            }
            if data.get("anon"):
                res_data.update(
                    {
                        "user": get_uid_hash(req_user.id),
                        "name": get_uid_hash(req_user.id),
                    }
                )
            await ws.broadcast(res_data, class_session_id=id)
    except WebSocketDisconnect:
        ws.disconnect(websocket, class_session_id=id)
        data = {"type": "disconnect", "user": req_user.id, "name": req_user.full_name}
        await ws.broadcast(json.dumps(data), class_session_id=id)


@router.get("/test/test")
async def gettestests():
    return HTMLResponse(html)