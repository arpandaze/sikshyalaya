from typing import Optional  # noqa

from pydantic import BaseModel


class GroupBase(BaseModel):
    program_id: int
    sem: int


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
    pass
