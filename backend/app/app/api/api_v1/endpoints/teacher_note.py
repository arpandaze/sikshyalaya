from typing import Any, List

from fastapi import APIRouter, Body, Depends, HTTPException
from fastapi.encoders import jsonable_encoder
from pydantic.networks import EmailStr
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps
from app.core.config import settings
from app.utils import send_new_account_email

from app.crud.crud_teacher_note import crud_teacher_note
from schemas import teacher_note

router = APIRouter()


@router.get("/teachernote", response_model=List[teacher_note.TeacherNote])
def get_programs(db: Session = Depends(deps.get_db), skip: int = 0, limit: int = 100)-> Any:
    #retrieve 100 teacher notes
    teacher_notes = crud_teacher_note.get_multi(db, skip = skip, limit = limit)
    return teacher_notes


@router.post("/teachernote", response_model= teacher_note.TeacherNote)
def create_program(db: Session = Depends(deps.get_db), teacherNote_in: teacher_note.TeacherNoteCreate)-> Any:
    #create a teacher note
    teacher_note = crud_teacher_note.create(db, obj_in = teacherNote_in)
    return teacher_note


@router.get("/teachernote/{teachernote_id}", response_model = teacher_note.TeacherNote)
def get_program(db: Session = Depends(deps.get_db), teachernote_id: int)-> Any:
    #get the teacher note by id
    teacher_note = crud_teacher_note.get(db, teachernote_id)
    return teacher_note


@router.put("/teachernote/{teachernote_id}", response_model = teacher_note.TeacherNote)
def update_program(db: Session = Depends(deps.get_db), teachernote_id: int, teacherNote_update: teacher_note.TeacherNoteUpdate)-> Any:
    
    #get the teacher note by id
    teacher_note = crud_teacher_note.get(db, teachernote_id)


    #update the teacher note
    teacher_note = crud_teacher_note.update(db, db_obj = teacher_note, obj_in = teacherNote_update)
    return teacher_note
