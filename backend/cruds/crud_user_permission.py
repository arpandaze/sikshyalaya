from cruds.base import CRUDBase
from schemas.user_permission import UserPermissionCreate, UserPermissionUpdate
from models.user_permission import UserPermission


class CRUDUserPermission(
    CRUDBase[UserPermission, UserPermissionCreate, UserPermissionUpdate]
):
    pass


crud_user_permission = CRUDUserPermission(UserPermission)
