from typing import Optional

from pydantic import BaseModel


# shared properties
class PersonalNoteBase(BaseModel):
    user_id: int
    course_id: int
    message: str


# properties to recieve via
class PersonalNoteCreate(PersonalNoteBase):
    pass


# properties to recive via API on Update
class PersonalNoteUpdate(PersonalNoteBase):
    pass


# properties to return via the api
class PersonalNoteInDBBase(PersonalNoteBase):
    id: Optional[int]

    class Config:
        orm_mode = True


class PersonalNoteInDB(PersonalNoteInDBBase):
    pass


class PersonalNote(PersonalNoteInDBBase):
    pass
