from cruds.base import CRUDBase
from schemas.user_permission import UserPermissionCreate, UserPermissionUpdate
from models.user_permission import UserPermission
from models import User
from sqlalchemy.orm import Session


class CRUDUserPermission(
    CRUDBase[UserPermission, UserPermissionCreate, UserPermissionUpdate]
):
    def get_by_name(
        self, db: Session, *, name: str
    ):
        return db.query(self.model).filter(self.model.name == name).first()


crud_user_permission = CRUDUserPermission(UserPermission)
