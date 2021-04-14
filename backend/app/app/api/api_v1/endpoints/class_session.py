from typing import Any, List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api import deps
from app.crud import crud_class_session
from app.schemas import ClassSession, ClassSessionUpdate

router = APIRouter()


@router.get("/class_session", response_model=List[ClassSession])
def get_class_session(
    db: Session = Depends(deps.get_db), skip: int = 0, limit: int = 100
) -> Any:
    class_sessions = crud_class_session.get_multi(db, skip=skip, limit=limit)
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
