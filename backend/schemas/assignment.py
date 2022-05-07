from tokenize import group
from typing import Optional, List, Any  # noqa

from datetime import datetime
from pydantic import BaseModel
from schemas import TeacherShort, CourseMin, GroupReturn


class AssignmentBase(BaseModel):
    due_date: datetime
    marks: int = None
    title: str
    contents: str = None
    files: List[Any] = None
    instructor: List[int]
    group: List[int]
    course_id: int


class AssignmentCreate(AssignmentBase):
    instructor: Optional[List[int]]


class AssignmentUpdate(AssignmentBase):
    due_date: datetime = None
    marks: int = None
    title: str = None
    contents: str = None
    files: List[Any] = None
    instructor: List[int] = None
    group: List[int] = None
    course_id: int = None


class AssignmentInDBBase(AssignmentBase):
    id: Optional[int]

    class Config:
        orm_mode = True


class AssignmentInDB(AssignmentInDBBase):
    pass


class Assignment(BaseModel):
    id: Optional[int]
    due_date: datetime = None
    marks: int = None
    title: str
    contents: str = None
    files: List[Any] = None
    instructor: List[TeacherShort]
    group: List[GroupReturn]
    course: CourseMin
    exists: Optional[bool]

    class Config:
        orm_mode = True
