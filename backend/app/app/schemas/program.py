from typing import Optional

from pydantic import BaseModel


# properties shared
class ProgramBase(BaseModel):
    name: str
    department_id: int


# properties to recieve via
class ProgramCreate(ProgramBase):
    pass


# properties to recive via API on Update
class ProgramUpdate(ProgramBase):
    pass


# properties to return via the api
class ProgramInDBBase(ProgramBase):
    id: Optional[int]

    class Config:
        orm_mode = True


class ProgramInDB(ProgramInDBBase):
    pass


class Program(ProgramInDBBase):
    pass
