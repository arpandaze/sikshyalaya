from typing import Optional, List

from pydantic import BaseModel


# shared properties
class PersonalNoteBase(BaseModel):
    user_id: int
    tags: List[str] = None
    title: str
    content: str


# properties to recieve via
class PersonalNoteCreate(PersonalNoteBase):
    pass


# properties to recive via API on Update
class PersonalNoteUpdate(PersonalNoteBase):
    user_id: int = None
    tags: List[str] = None
    title: str = None
    content: str = None


# properties to return via the api
class PersonalNoteInDBBase(PersonalNoteBase):
    id: Optional[int]

    class Config:
        orm_mode = True


class PersonalNoteInDB(PersonalNoteInDBBase):
    pass


class PersonalNote(PersonalNoteInDBBase):
    pass
