from typing import Optional  # noqa

from pydantic import BaseModel


class FileBase(BaseModel):
    name: str
    address: str


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
