from typing import Any, List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api import deps
from app.crud import crud_personal_note
from app.schemas import PersonalNote, PersonalNoteUpdate

router = APIRouter()


@router.get("/personal_note", response_model=List[PersonalNote])
def get_personal_note(
    db: Session = Depends(deps.get_db), skip: int = 0, limit: int = 100
) -> Any:
    personal_note = crud_personal_note.get_multi(db, skip=skip, limit=limit)
    return personal_note


@router.post("/personal_note", response_model=PersonalNote)
def create_personal_note(
    db: Session = Depends(deps.get_db), *, obj_in: PersonalNoteUpdate
) -> Any:
    personal_note = crud_personal_note.create(db, obj_in=obj_in)
    return personal_note


@router.get("/personal_note/{id}", response_model=PersonalNote)
def get_specific_personal_note(db: Session = Depends(deps.get_db), *, id: int) -> Any:
    personal_note = crud_personal_note.get(db, id)
    return personal_note


@router.put("/personal_note/{id}", response_model=PersonalNote)
def update_personal_note(
    db: Session = Depends(deps.get_db), *, id: int, obj_in: PersonalNoteUpdate
) -> Any:
    personal_note = crud_personal_note.get(db, id)
    personal_note = crud_personal_note.update(db, db_obj=personal_note, obj_in=obj_in)
    return personal_note
