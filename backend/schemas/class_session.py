from datetime import datetime
from typing import Optional, List

from pydantic import BaseModel
from typing import Any
from schemas.user import UserReturnMin, TeacherShort
from schemas.course import Course
from schemas.file import FileClassSessionReturn


# shared properties
class ClassSessionBase(BaseModel):
    start_time: datetime
    end_time: datetime
    instructor: List[int]
    course_id: int
    group_id: int
    description: str


# properties to recieve via
class ClassSessionCreate(ClassSessionBase):
    pass


# properties to recive via API on Update
class ClassSessionUpdate(ClassSessionBase):
    start_time: datetime = None
    end_time: datetime = None
    instructor: List[int] = None
    course_id: int = None
    description: str = None
    group_id: int = None


# properties to return via the api
class ClassSessionInDBBase(ClassSessionBase):
    id: Optional[int]

    class Config:
        orm_mode = True


class ClassSession(ClassSessionInDBBase):
    instructor: List[TeacherShort]
    pass


class ClassSessionReturn(BaseModel):
    start_time: datetime
    end_time: datetime
    instructor: List[TeacherShort]
    course: Course
    group_id: int
    description: str
    files: List[FileClassSessionReturn] = None

    class Config:
        orm_mode = True


class ClassSessionInDB(ClassSessionInDBBase):
    pass
