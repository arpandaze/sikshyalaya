from app.crud.base import CRUDBase
from app.schemas.user_permission import UserPermissionCreate, UserPermissionUpdate
from app.models.user_permission import UserPermission


class CRUDUserPermission(
    CRUDBase[UserPermission, UserPermissionCreate, UserPermissionUpdate]
):
    pass


crud_user_permission = CRUDUserPermission(UserPermission)
