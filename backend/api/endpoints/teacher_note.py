from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from utils import deps
from cruds import crud_teacher_note
from schemas import TeacherNote, TeacherNoteUpdate, TeacherNoteCreate


router = APIRouter()


# TODO: Search by student ??
@router.get("/teacher_note/", response_model=List[TeacherNote])
async def get_teacher_note(
    user=Depends(deps.get_current_active_teacher),
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    teacher_note = crud_teacher_note.get_user_teacher_note(db, user=user)
    return teacher_note


# TODO: Teacher can only post notes on students that are his student
@router.post("/teacher_note/", response_model=TeacherNote)
async def create_teacher_note(
    user=Depends(deps.get_current_active_teacher),
    db: Session = Depends(deps.get_db),
    *,
    obj_in: TeacherNoteCreate
) -> Any:
    teacher_note = crud_teacher_note.create(db, obj_in=obj_in)
    return teacher_note


@router.get("/teacher_note/{id}/", response_model=TeacherNote)
async def get_specific_teacher_note(
    user=Depends(deps.get_current_active_teacher),
    db: Session = Depends(deps.get_db),
    *,
    id: int
) -> Any:
    teacher_note = crud_teacher_note.get_user_teacher_note(db=db, user=user, id=id)
    return teacher_note


@router.put("/teacher_note/{id}/", response_model=TeacherNote)
async def update_teacher_note(
    user=Depends(deps.get_current_active_teacher),
    db: Session = Depends(deps.get_db),
    *,
    id: int,
    obj_in: TeacherNoteUpdate
) -> Any:
    teacher_note = crud_teacher_note.get_user_teacher_note(db=db, user=user, id=id)
    if not teacher_note:
        raise HTTPException(status_code=403, detail="Error ID: 127")  # Access denied!
    teacher_note = crud_teacher_note.update(db, db_obj=teacher_note, obj_in=obj_in)
    return teacher_note
