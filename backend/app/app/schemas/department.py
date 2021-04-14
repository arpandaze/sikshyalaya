from typing import Optional  # noqa

from pydantic import BaseModel


class DepartmentCreate(BaseModel):
    name: str
    school: int


class DepartmentRetrieve(BaseModel):
    id: int


class DepartmentUpdate(BaseModel):
    name: str
    school: int


class DepartmentDelete(BaseModel):
    id: int
