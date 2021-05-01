from cruds.base import CRUDBase
from schemas.teacher_note import TeacherNoteCreate, TeacherNoteUpdate
from models.teacher_note import TeacherNote
from typing import Any, List

from cruds.base import CRUDBase
from cruds.user import crud_user
from models import ClassSession
from models import User
from schemas import ClassSessionCreate, ClassSessionUpdate
from sqlalchemy.orm import Session
from core.config import settings


class CRUDTeacherNote(CRUDBase[TeacherNote, TeacherNoteCreate, TeacherNoteUpdate]):
    def get_user_teacher_note(self, db: Session, user: User, id: int = None):
        teacher_notes = db.query(self.model)
        if id:
            teacher_notes = (
                teacher_notes.filter(TeacherNote.id == id)
                .filter(TeacherNote.user_id == user.id)
                .first()
            )
            return teacher_notes
        else:
            teacher_notes = teacher_notes.filter(TeacherNote.user_id == user.id).all()
            return teacher_notes


crud_teacher_note = CRUDTeacherNote(TeacherNote)
