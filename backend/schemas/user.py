from typing import Optional, List
from datetime import date
from schemas.group import GroupReturn, Group
from core.config import settings

from pydantic import BaseModel, EmailStr


# Shared properties
class UserBase(BaseModel):
    email: Optional[EmailStr] = None
    is_active: Optional[bool] = False
    full_name: Optional[str] = None
    user_type: int
    address: str = None
    group_id: int = None
    contact_number: str = None
    dob: date = None
    teacher_group: List[int] = None
    join_year: Optional[int] = None


class UserSignUp(BaseModel):
    email: Optional[EmailStr] = None
    full_name: Optional[str] = None
    address: str = None
    group_id: int = None
    contact_number: str = None
    dob: date = None
    join_year: Optional[int] = None
    password: str


# Properties to receive via API on creation
class UserCreate(UserBase):
    email: EmailStr
    user_type: int = settings.UserType.STUDENT.value
    password: str


class VerifyUser(BaseModel):
    is_active: bool


class UserReturn(BaseModel):
    id: int

    class Config:
        orm_mode = True


# Properties to receive via API on update
class UserUpdate(UserBase):
    user_type: int = None
    password: Optional[str] = None
    profile_image: Optional[str] = None


class UserInDBBase(UserBase):
    id: Optional[int] = None
    teacher_group: List[Group]
    profile_image: Optional[str] = None

    class Config:
        orm_mode = True


# Additional properties to return via API
class User(UserInDBBase):
    pass


class UserLoginReturn(BaseModel):
    id: int = None
    email: Optional[EmailStr] = None
    profile_image: Optional[str] = None
    full_name: Optional[str] = None
    address: str = None
    group: GroupReturn = None
    contact_number: str = None
    dob: date = None
    join_year: Optional[int] = None

    class Config:
        orm_mode = True


# Additional properties stored in DB
class UserInDB(UserInDBBase):
    hashed_password: str
