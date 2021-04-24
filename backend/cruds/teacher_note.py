from cruds.base import CRUDBase
from schemas.teacher_note import TeacherNoteCreate, TeacherNoteUpdate
from models.teacher_note import TeacherNote


class CRUDTeacherNote(CRUDBase[TeacherNote, TeacherNoteCreate, TeacherNoteUpdate]):
    pass


crud_teacher_note = CRUDTeacherNote(TeacherNote)
