from schemas.program import Program
from typing import Optional, List  # noqa

from pydantic import BaseModel
from .course import Course


class GroupBase(BaseModel):
    program_id: int
    sem: int
    course: List[int]


class GroupCreate(GroupBase):
    pass


class GroupUpdate(GroupBase):
    pass


class GroupInDBBase(GroupBase):
    id: Optional[int]
    course: List[Course]

    class Config:
        orm_mode = True


class GroupInDB(GroupInDBBase):
    pass


class Group(GroupInDBBase):
    pass


class StudentOfGroup(BaseModel):
    id: int
    full_name: str
    class Config:
        orm_mode = True

class GroupStudentReturn(BaseModel):
    id: Optional[int]
    student: List[StudentOfGroup]
    class Config:
        orm_mode = True


class GroupSignInReturn(BaseModel):
    id: Optional[int]
    sem: int
    program: Program
    course: List[Course]

    class Config:
        orm_mode = True

class GroupReturn(BaseModel):
    id: Optional[int]
    sem: int
    program: Program

    class Config:
        orm_mode = True
