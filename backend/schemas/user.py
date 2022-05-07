from typing import Any, Optional, List
from datetime import date
from schemas.program import ProgramInDB
from schemas.group import GroupSignInReturn, Group
from schemas.course import CourseInDB
from core.config import settings

from pydantic import BaseModel, EmailStr


# Shared properties
class UserBase(BaseModel):
    email: Optional[EmailStr] = None
    full_name: Optional[str] = None
    user_type: int
    address: str = None
    group_id: int = None
    roll: int = None
    teacher_department_id: int = None
    contact_number: str = None
    dob: date = None
    teacher_group: List[List[int]] = None
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


class AdminUserCreate(BaseModel):
    email: EmailStr = None
    full_name: str = None
    address: Optional[str] = None
    group_id: Optional[int] = None
    roll: Optional[int] = None
    contact_number: str = None
    dob: date = None
    join_year: Optional[int] = None


class VerifyUser(BaseModel):
    is_active: bool


class UserReturnMin(BaseModel):
    id: int

    class Config:
        orm_mode = True


class TeacherShort(BaseModel):
    id: int
    full_name: str
    profile_image: Optional[str]

    class Config:
        orm_mode = True


# Properties to receive via API on update
class UserUpdate(BaseModel):
    full_name: Optional[str]
    address: Optional[str]
    group_id: Optional[int]
    dob: Optional[date]
    contact_number: Optional[str]
    profile_image: Optional[str]


class PasswordUpdate(BaseModel):
    password: str


class UserInDBBase(UserBase):
    id: Optional[int] = None
    teacher_group: Optional[List[Group]]
    profile_image: Optional[str] = None

    class Config:
        orm_mode = True


# Additional properties to return via API
class User(UserInDBBase):
    pass


class GroupOfTeacherGroupOfUser(BaseModel):
    id: int
    sem: int
    program: ProgramInDB

    class Config:
        orm_mode = True


class TeacherGroupOfUser(BaseModel):
    group_id: int
    group: GroupOfTeacherGroupOfUser
    course: CourseInDB

    class Config:
        orm_mode = True


class UserReturn(BaseModel):
    id: int = None
    email: Optional[EmailStr] = None
    profile_image: Optional[str] = None
    full_name: Optional[str] = None
    address: str = None
    roll: int = None
    group: GroupSignInReturn = None
    teacher_group: List[TeacherGroupOfUser] = None
    contact_number: str = None
    dob: date = None
    user_type: int = None
    join_year: Optional[int] = None
    is_active: bool = None

    class Config:
        orm_mode = True


class UserLoginReturn(BaseModel):
    user: Optional[UserReturn]
    msg: str
    two_fa_required: Optional[bool]

    class Config:
        orm_mode = True


# Additional properties stored in DB
class UserInDB(UserInDBBase):
    hashed_password: str


class Name(BaseModel):
    id: int
    full_name: str
    profile_image: Optional[str]

    class Config:
        orm_mode = True
