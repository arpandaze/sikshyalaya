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


class GroupReturn(BaseModel):
    id: Optional[int]
    sem: int
    program_id: int

    class Config:
        orm_mode = True
