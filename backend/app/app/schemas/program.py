from pydantic import BaseModel
from typing import Optional

#properties shared 
class ProgramBase(BaseModel):
    name: str
    department_id: int

#properties to recieve via
class ProgramCreate(ProgramBase):
    pass

#properties to recive via API on Update
class ProgramUpdate(ProgramBase):
    pass

#properties to return via the api
class Program(ProgramBase):
    id: Optional[int]
    class Config:
        orm_mode = True

    