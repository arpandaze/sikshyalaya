from datetime import datetime
from typing import Optional, List
from datetime import datetime


from pydantic import BaseModel


# shared properties
class PersonalNoteBase(BaseModel):
    user_id: int
    tags: List[str] = None
    title: str
    content: str
    last_updated_time: datetime


# properties to recieve via
class PersonalNoteCreate(PersonalNoteBase):
    last_updated_time = datetime.now()


# properties to recive via API on Update
class PersonalNoteUpdate(PersonalNoteBase):
    user_id: int = None
    tags: List[str] = None
    title: str = None
    content: str = None
    last_updated_time = datetime.now()


# properties to return via the api
class PersonalNoteInDBBase(PersonalNoteBase):
    id: Optional[int]

    class Config:
        orm_mode = True


class PersonalNoteInDB(PersonalNoteInDBBase):
    pass


class PersonalNote(PersonalNoteInDBBase):
    pass
