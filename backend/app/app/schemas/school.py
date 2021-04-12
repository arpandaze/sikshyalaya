from typing import Optional  # noqa

from pydantic import BaseModel


class SchoolCreate(BaseModel):
    name: str
    address: int


class SchoolCreate(BaseModel):
    name: str
    address: int


class SchoolRetrieve(BaseModel):
    id: int


class SchoolUpdate(BaseModel):
    name: str
    address: int


class SchoolDelete(BaseModel):
    id: int
