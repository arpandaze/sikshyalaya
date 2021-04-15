from app.crud.base import CRUDBase
from app.schemas.teacher_note import TeacherNoteCreate, TeacherNoteUpdate
from app.models.teacher_note import TeacherNote


class CRUDTeacherNote(CRUDBase[TeacherNote, TeacherNoteCreate, TeacherNoteUpdate]):
    pass


crud_teacher_note = CRUDTeacherNote(TeacherNote)
