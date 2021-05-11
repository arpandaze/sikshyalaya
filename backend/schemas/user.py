from typing import Optional, List
from datetime import datetime
from schemas.group import Group

from pydantic import BaseModel, EmailStr


# Shared properties
class UserBase(BaseModel):
    email: Optional[EmailStr] = None
    is_active: Optional[bool] = True
    full_name: Optional[str] = None
    user_type: int
    address: str = None
    group_id: int = None
    contact_number: str = None
    dob: datetime = None
    teacher_group: List[int] = None
    join_year: Optional[int] = None


# Properties to receive via API on creation
class UserCreate(UserBase):
    email: EmailStr
    password: str


class UserReturn(BaseModel):
    id: int

    class Config:
        orm_mode = True


# Properties to receive via API on update
class UserUpdate(UserBase):
    password: Optional[str] = None


class UserInDBBase(UserBase):
    id: Optional[int] = None
    teacher_group: List[Group]

    class Config:
        orm_mode = True


# Additional properties to return via API
class User(UserInDBBase):
    pass


# Additional properties stored in DB
class UserInDB(UserInDBBase):
    hashed_password: str
