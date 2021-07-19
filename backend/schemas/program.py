from typing import Optional, List

from pydantic import BaseModel


# properties shared
class ProgramBase(BaseModel):
    name: str
    department_id: int


# properties to recieve via
class ProgramCreate(ProgramBase):
    max_sems: int


# properties to recive via API on Update
class ProgramUpdate(ProgramBase):
    name: Optional[str]
    department_id: Optional[int]


# properties to return via the api
class ProgramInDBBase(ProgramBase):
    id: Optional[int]

    class Config:
        orm_mode = True


class ProgramInDB(ProgramInDBBase):
    pass


class Program(ProgramInDBBase):
    pass


class GroupOfProgram(BaseModel):
    id: int
    sem: int

    class Config:
        orm_mode = True


class ProgramGroupReturn(BaseModel):
    name: str
    department_id: int
    groups: List[GroupOfProgram]

    class Config:
        orm_mode = True
