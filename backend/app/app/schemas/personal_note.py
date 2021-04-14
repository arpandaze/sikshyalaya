from pydantic import BaseModel
from typing import Optional

#shared properties
class PersonalNoteBase(BaseModel):
    user_id: int
    student_id: int
    message: str

#properties to recieve via
class PersonalNoteCreate(PersonalNoteBase):
    pass

#properties to recive via API on Update
class PersonalNoteUpdate(PersonalNoteBase):
    pass

#properties to return via the api
class PersonalNote(PersonalNoteBase):
    id: Optional[int]
    class Config:
        orm_mode = True
