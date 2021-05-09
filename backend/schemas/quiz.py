from typing import Optional  # noqa

from pydantic import BaseModel


class quizBase(BaseModel):
    name: str
    address: str


class quizCreate(quizBase):
    pass


class quizUpdate(quizBase):
    pass


class quizInDBBase(quizBase):
    id: Optional[int]

    class Config:
        orm_mode = True


class quizInDB(quizInDBBase):
    pass


class quiz(quizInDBBase):
    pass
