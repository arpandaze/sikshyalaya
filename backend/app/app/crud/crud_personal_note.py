from app.crud.base import CRUDBase
from app.schemas.personal_note import PersonalNoteCreate, PersonalNoteUpdate
from app.models.personal_note import PersonalNote


class CRUDPersonalNote(CRUDBase[PersonalNote, PersonalNoteCreate, PersonalNoteUpdate]):
    pass


crud_personal_note = CRUDPersonalNote(PersonalNote)
