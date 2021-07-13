from typing import Optional  # noqa

from pydantic import BaseModel


class DepartmentBase(BaseModel):
    name: str
    school_id: Optional[int]


class DepartmentCreate(DepartmentBase):
    pass


class DepartmentUpdate(DepartmentBase):
    pass


class DepartmentInDBBase(DepartmentBase):
    id: Optional[int]

    class Config:
        orm_mode = True


class DepartmentInDB(DepartmentInDBBase):
    pass


class Department(DepartmentInDBBase):
    pass
