from datetime import datetime
from typing import Optional, List

from pydantic import BaseModel
from typing import Any
from schemas.user import UserReturnMin, TeacherOfClassSession
from schemas.course import Course


# shared properties
class ClassSessionBase(BaseModel):
    start_time: datetime
    end_time: datetime
    is_active: bool
    instructor: List[int]
    course_id: int
    group_id: int
    description: str
    file: List[str] = None


# properties to recieve via
class ClassSessionCreate(ClassSessionBase):
    pass


# properties to recive via API on Update
class ClassSessionUpdate(ClassSessionBase):
    start_time: datetime = None
    end_time: datetime = None
    is_active: bool = None
    instructor: List[int] = None
    course_id: int = None
    description: str = None
    file: List[str] = None
    group_id: int = None


# properties to return via the api
class ClassSessionInDBBase(ClassSessionBase):
    id: Optional[int]

    class Config:
        orm_mode = True


class ClassSession(ClassSessionInDBBase):
    instructor: List[TeacherOfClassSession]
    pass


class ClassSessionReturn(BaseModel):
    start_time: datetime
    end_time: datetime
    is_active: bool
    instructor: List[TeacherOfClassSession]
    course: Course
    group_id: int
    description: str
    file: List[str] = None

    class Config:
        orm_mode = True


class ClassSessionInDB(ClassSessionInDBBase):
    pass
