import os
import aiofiles
from typing import Any, List

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
        raise HTTPException(status_code=401, detail="Access denied!")

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
        raise HTTPException(status_code=401, detail="Access denied!")
    file = FileResponse(f"{settings.UPLOAD_DIR_ROOT}/{id}/{filename}")
    return file
