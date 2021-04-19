from datetime import datetime
from typing import Optional, List

from pydantic import BaseModel
from typing import Any
from .user import UserReturn


# shared properties
class ClassSessionBase(BaseModel):
    datetime: datetime
    is_active: bool
    instructors: List[int]
    group_id: int
    course_id: int
    description: str
    duration: int


# properties to recieve via
class ClassSessionCreate(ClassSessionBase):
    pass


# properties to recive via API on Update
class ClassSessionUpdate(ClassSessionBase):
    pass


# properties to return via the api
class ClassSessionInDBBase(ClassSessionBase):
    id: Optional[int]

    class Config:
        orm_mode = True


class ClassSession(ClassSessionInDBBase):
    instructors: List[UserReturn]
    pass


class ClassSessionInDB(ClassSessionInDBBase):
    pass
