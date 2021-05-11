from datetime import datetime
from typing import Optional, List

from pydantic import BaseModel
from typing import Any
from .user import UserReturn


# shared properties
class ClassSessionBase(BaseModel):
    datetime: datetime
    is_active: bool
    instructor: List[int]
    course_id: int
    group_id: int
    description: str
    duration: int
    file: List[str]


# properties to recieve via
class ClassSessionCreate(ClassSessionBase):
    pass


# properties to recive via API on Update
class ClassSessionUpdate(ClassSessionBase):
    datetime: datetime = None
    is_active: bool = None
    instructor: List[int] = None
    course_id: int = None
    description: str = None
    duration: int = None
    file: List[str] = None
    group_id: int = None


# properties to return via the api
class ClassSessionInDBBase(ClassSessionBase):
    id: Optional[int]

    class Config:
        orm_mode = True


class ClassSession(ClassSessionInDBBase):
    instructor: List[UserReturn]
    pass


class ClassSessionInDB(ClassSessionInDBBase):
    pass
