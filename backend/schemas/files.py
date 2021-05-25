from typing import Optional  # noqa
from datetime import datetime

from pydantic import BaseModel


class FilesBase(BaseModel):
    id: int
    path: str
    file_type:str
    uploaded_datetime:datetime
    description:str


class FilesCreate(FilesBase):
    pass


class FilesUpdate(FilesBase):
    pass


class FilesInDBBase(FilesBase):
    id: Optional[int]

    class Config:
        orm_mode = True


class FilesInDB(FilesInDBBase):
    pass


class Files(FilesInDBBase):
    pass
