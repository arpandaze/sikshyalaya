from typing import Optional

from pydantic import BaseModel


# shared properties
class UserPermissionBase(BaseModel):
    name: str


# properties to recieve via
class UserPermissionCreate(UserPermissionBase):
    pass


# properties to recive via API on Update
class UserPermissionUpdate(UserPermissionBase):
    pass


# properties to return via the api
class UserPermissionInDBBase(UserPermissionBase):
    id: Optional[int]

    class Config:
        orm_mode = True


class UserPermissionInDB(UserPermissionInDBBase):
    pass


class UserPermission(UserPermissionInDBBase):
    pass
