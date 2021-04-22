from typing import Any, Dict, Optional, Union

from sqlalchemy.orm import Session

from core.security import get_password_hash, verify_password
from cruds.base import CRUDBase
from cruds.crud_course import crud_course
from models.user import User
from schemas.user import UserCreate, UserUpdate
from core.config import settings


class CRUDUser(CRUDBase[User, UserCreate, UserUpdate]):
    def get_by_email(self, db: Session, *, email: str) -> Optional[User]:
        return db.query(User).filter(User.email == email).first()

    def get_by_id(self, db: Session, *, id: id) -> Optional[User]:
        return db.query(User).filter(User.id == id).first()

    def create(self, db: Session, *, obj_in: UserCreate) -> User:
        if obj_in.course:
            courses = list(map(lambda id: crud_course.get(db=db, id=id), obj_in.course))
        else:
            courses = []

        db_obj = User(
            email=obj_in.email,  # noqa
            hashed_password=get_password_hash(obj_in.password),  # noqa
            full_name=obj_in.full_name,  # noqa
            dob=obj_in.dob,  # noqa
            enrolled_course=courses,  # noqa
            group_id=obj_in.group_id,
            contact_number=obj_in.contact_number,  # noqa
            address=obj_in.address,  # noqa
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
        self, db: Session, *, db_obj: User, obj_in: Union[UserUpdate, Dict[str, Any]]
    ) -> User:
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)
        if update_data["password"]:
            hashed_password = get_password_hash(update_data["password"])
            del update_data["password"]
            update_data["hashed_password"] = hashed_password
        return super().update(db, db_obj=db_obj, obj_in=update_data)

    def authenticate(self, db: Session, *, email: str, password: str) -> Optional[User]:
        user = self.get_by_email(db, email=email)
        if not user:
            return None
        if not verify_password(password, user.hashed_password):
            return None
        return user

    def is_active(self, user: User) -> bool:
        return user.is_active

    def is_superuser(self, user: User) -> bool:
        if user.user_type == settings.UserType.SUPERADMIN.value:
            return True
        else:
            return False


crud_user = CRUDUser(User)