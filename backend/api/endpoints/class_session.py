import json
import os
from hashlib import sha256
from typing import Any, List

import aiofiles
from fastapi import (
    APIRouter,
    Depends,
    FastAPI,
    File,
    Form,
    HTTPException,
    UploadFile,
    WebSocket,
    WebSocketDisconnect,
)
from fastapi.encoders import jsonable_encoder
from fastapi.responses import FileResponse, HTMLResponse
from sqlalchemy.orm import Session

from core.config import settings
from core.security import get_uid_hash
from core.websocket import ws, ChatMessageTypes
from cruds import crud_class_session, crud_file, crud_user
from forms.class_session import ClassSessionCreateForm
from models import ClassSession as ClassSessionModel
from models import File as FileModel
from schemas.class_session import (
    ClassSession,
    ClassSessionCreate,
    ClassSessionReturn,
    ClassSessionUpdate,
    ClassSessionTeacherReturn,
    AttendanceUpdate,
)
from schemas.file import FileCreate
from utils import deps
from utils.deps import get_current_active_teacher_or_above, get_current_active_user, get_current_active_ws_user

router = APIRouter()


@router.get("/", response_model=List[ClassSessionReturn])
def get_class_session(
    db: Session = Depends(deps.get_db),
    user=Depends(get_current_active_user),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    class_sessions = crud_class_session.get_user_class_session(db, user=user)
    return class_sessions


@router.post("/", response_model=ClassSession)
async def create_class_session(
    db: Session = Depends(deps.get_db),
    user=Depends(get_current_active_teacher_or_above),
    *,
    form: ClassSessionCreateForm = Depends(),
) -> Any:
    course_id = None
    for item in user.teacher_group:
        course_id = item.course.id if item.group.id == form.group else course_id

    data = ClassSessionCreate(
        start_time=form.start_time,
        end_time=form.end_time,
        instructor=list(set([user.id, *form.instructor])),
        description=form.description,
        group_id=form.group,
        course_id=course_id,
    )

    class_session = crud_class_session.create(db, obj_in=data)

    hasher = sha256()
    hasher.update(bytes(f"{class_session.id}_{settings.SECRET_KEY}", "utf-8"))
    db_folder_path = os.path.join("class_files", hasher.hexdigest())
    folder_path = os.path.join(settings.UPLOAD_DIR_ROOT, db_folder_path)

    if not os.path.exists(folder_path):
        os.makedirs(folder_path)

    if form.file:
        for file in form.file:
            file_path = os.path.join(folder_path, file.filename)
            async with aiofiles.open(file_path, mode="wb") as f:
                content = await file.read()
                await f.write(content)

            db.add(
                FileModel(
                    name=file.filename,
                    path=db_folder_path,
                    file_type=file.content_type,
                    description=None,
                    class_session=class_session,
                )
            )
            db.commit()

    return class_session


@router.get("/{id}/", response_model=ClassSessionReturn)
def get_specific_class_session(
    db: Session = Depends(deps.get_db),
    user=Depends(get_current_active_user),
    *,
    id: int,
) -> Any:
    class_session = crud_class_session.get_user_class_session(db=db, user=user, id=id)
    return class_session


@router.get("/{id}/attendance", response_model=ClassSessionTeacherReturn)
def get_class_session_with_attendance(
    db: Session = Depends(deps.get_db),
    user=Depends(get_current_active_teacher_or_above),
    *,
    id: int,
) -> Any:
    class_session = crud_class_session.get_user_class_session(db=db, user=user, id=id)
    return class_session


@router.put("/{id}/", response_model=ClassSession)
def update_class_session(
    db: Session = Depends(deps.get_db), *, id: int, obj_in: ClassSessionUpdate
) -> Any:
    class_session = crud_class_session.get(db, id)
    class_session = crud_class_session.update(db, db_obj=class_session, obj_in=obj_in)
    return class_session


@router.put("/{class_id}/files")
async def update_class_session(
    db: Session = Depends(deps.get_db),
    *,
    class_id: int,
    files: List[UploadFile] = File(None),
) -> Any:
    class_session = crud_class_session.get(db, class_id)

    hasher = sha256()
    hasher.update(bytes(f"{class_id}_{settings.SECRET_KEY}", "utf-8"))
    db_folder_path = os.path.join("class_files", hasher.hexdigest())
    folder_path = os.path.join(settings.UPLOAD_DIR_ROOT, db_folder_path)

    if not os.path.exists(folder_path):
        os.makedirs(folder_path)

    for file in files:
        file_path = os.path.join(folder_path, file.filename)
        async with aiofiles.open(file_path, mode="wb") as f:
            content = await file.read()
            await f.write(content)

        db.add(
            FileModel(
                name=file.filename,
                path=db_folder_path,
                file_type=file.content_type,
                description=None,
                class_session=class_session,
            )
        )
        db.commit()
    return {"msg": "success"}


@router.put("/{id}/attendance")
def attendance_of_class_session(
    db: Session = Depends(deps.get_db),
    *,
    id: int,
    obj_in: AttendanceUpdate,
    current_teacher=Depends(get_current_active_teacher_or_above),
) -> Any:
    class_session = crud_class_session.get_user_class_session(
        db=db, user=current_teacher, id=id
    )
    if not class_session:
        raise HTTPException(status_code=403, detail="Class session access denied!")
    class_session = crud_class_session.attendance_update(
        db, db_obj=class_session, obj_in=obj_in
    )
    return {"msg": "success"}


# @router.post("/{id}/file/")
# async def create_upload_files(
# db: Session = Depends(deps.get_db),
# files: List[UploadFile] = File(...),
# current_teacher=Depends(
# get_current_active_teacher_or_above
# ),  # FIXME : Get current user ?
# *,
# id: int,
# ):
# class_session = crud_class_session.get_user_class_session(
# db=db, user=current_teacher, id=id
# )

# if not class_session:
# raise HTTPException(status_code=403, detail="Error ID: 100")  # Access denied!

# FILE_PATH = os.path.join("static", settings.UPLOAD_DIR_ROOT)
# working_directory = os.getcwd()
# FILE_PATH = os.path.join(working_directory, FILE_PATH)

# for file in files:
# filename = f"{FILE_PATH}/{id}/{file.filename}"
# async with aiofiles.open(filename, mode="wb") as f:
# content = await file.read()
# await f.write(content)

# obj_in = ClassSessionUpdate(file=[file.filename for file in files])
# crud_class_session.update(db=db, db_obj=class_session, obj_in=obj_in)

# return {"msg": "success"}


@router.websocket("/ws/{id}/")
async def websocket_endpoint(
    db: Session = Depends(deps.get_db),
    *,
    websocket: WebSocket,
    req_user=Depends(get_current_active_ws_user),
    id: int,
):
    user_id = req_user.id
    class_session = crud_class_session.get_user_class_session(
        db=db, user=req_user, id=id
    )
    if not class_session:
        raise HTTPException(
            status_code=403, detail="Error Code: 144"
        )  # User doesn't have access to classsession
    await ws.connect(websocket=websocket, class_session_id=id, user_id=user_id)
    try:
        while True:
            data = await websocket.receive_json()
            if data.get("msg_type") == ChatMessageTypes.MESSAGE_HISTORY.value:
                await ws.send_history(websocket, id)
            else:
                await ws.message(
                    websocket=websocket,
                    user_id=user_id,
                    class_session_id=id,
                    message=data.get("message"),
                    anon=data.get("anon"),
                )
    except WebSocketDisconnect:
        await ws.disconnect(websocket, class_session_id=id, user_id=user_id)
