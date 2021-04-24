from cruds.base import CRUDBase
from schemas.personal_note import PersonalNoteCreate, PersonalNoteUpdate
from models.personal_note import PersonalNote


class CRUDPersonalNote(CRUDBase[PersonalNote, PersonalNoteCreate, PersonalNoteUpdate]):
    pass


crud_personal_note = CRUDPersonalNote(PersonalNote)
