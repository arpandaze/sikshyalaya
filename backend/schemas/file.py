from typing import Optional  # noqa

from pydantic import BaseModel
from datetime import datetime


class FileBase(BaseModel):
    name:str
    path: str
    file_type: str
    uploaded_datetime: datetime = None
    description: str = None
    class_session_id: int


class FileCreate(FileBase):
    pass


class FileUpdate(FileBase):
    pass


class FileInDBBase(FileBase):
    id: Optional[int]

    class Config:
        orm_mode = True


class FileInDB(FileInDBBase):
    pass


class File(FileInDBBase):
    pass


class FileClassSessionReturn(BaseModel):
    name: str
    path: str
    file_type: str
    uploaded_datetime: datetime = None
    description: str = None

    class Config:
        orm_mode = True
