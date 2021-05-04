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

    class Config:
        orm_mode = True


class GroupInDB(GroupInDBBase):
    pass


class Group(GroupInDBBase):
    course: List[Course]
