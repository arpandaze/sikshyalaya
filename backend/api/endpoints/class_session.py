from typing import Any, List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from utils import deps
from cruds import crud_class_session, crud_user
from schemas import ClassSession, ClassSessionUpdate

from fastapi import FastAPI, File, UploadFile
from fastapi.responses import FileResponse

router = APIRouter()


@router.get("/class_session", response_model=List[ClassSession])
def get_class_session(
    db: Session = Depends(deps.get_db), skip: int = 0, limit: int = 100
) -> Any:
    user = crud_user.get_by_id(db, id=1)
    class_sessions = crud_class_session.get_user_class_sessions(db, user=user)
    return class_sessions


@router.post("/class_session", response_model=ClassSession)
def create_class_session(
    db: Session = Depends(deps.get_db), *, obj_in: ClassSessionUpdate
) -> Any:
    class_session = crud_class_session.create(db, obj_in=obj_in)
    return class_session


@router.get("/class_session/{id}", response_model=ClassSession)
def get_specific_class_session(db: Session = Depends(deps.get_db), *, id: int) -> Any:
    class_session = crud_class_session.get(db, id)
    return class_session


@router.put("/class_session/{id}", response_model=ClassSession)
def update_class_session(
    db: Session = Depends(deps.get_db), *, id: int, obj_in: ClassSessionUpdate
) -> Any:
    class_session = crud_class_session.get(db, id)
    class_session = crud_class_session.update(db, db_obj=class_session, obj_in=obj_in)
    return class_session


@router.get("/class_session/{id}/files/{file_id}", response_model=ClassSession)
def update_class_session(
    db: Session = Depends(deps.get_db), *, id: int, file_id: int
) -> Any:
    class_session = crud_class_session.get(db, id)
    class_session = crud_class_session.update(db, db_obj=class_session, obj_in=obj_in)
    return class_session


@router.post("/class_session/uploadfiles/")
async def create_upload_files(files: List[UploadFile] = File(...)):
    return {"filenames": [file.filename for file in files]}


@router.get("/class_session/files/")
async def get_upload_files(filename: str):
    file = FileResponse(f"file/{filename}")
    return file
