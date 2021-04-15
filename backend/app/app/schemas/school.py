from typing import Optional  # noqa

from pydantic import BaseModel


class SchoolBase(BaseModel):
    name: str
    address: str


class SchoolCreate(SchoolBase):
    pass


class SchoolUpdate(SchoolBase):
    pass


class SchoolInDBBase(SchoolBase):
    id: Optional[int]

    class Config:
        orm_mode = True


class SchoolInDB(SchoolInDBBase):
    pass


class School(SchoolInDBBase):
    pass
