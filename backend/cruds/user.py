from typing import Any, Dict, Optional, Union

from fastapi import HTTPException
from sqlalchemy.orm import Session

from core.config import settings
from core.permission.permission import check_permission
from core.security import get_password_hash, verify_password
from cruds.base import CRUDBase
from cruds.group import crud_group
from models import association_tables
from models.user import User
from schemas.user import UserCreate, UserUpdate
from models.association_tables import TeacherGroupCourseAssociation


class CRUDUser(CRUDBase[User, UserCreate, UserUpdate]):
    def get_by_email(self, db: Session, *, email: str) -> Optional[User]:
        return db.query(User).filter(User.email == email).first()

    def get_by_email_test(
        self,
        db: Session,
        *,
        email: str,
    ) -> Optional[User]:
        return db.query(User).filter(User.email == email).first()

    def get_by_id(self, db: Session, *, id: int) -> Optional[User]:
        return db.query(User).filter(User.id == id).first()

    def create(
        self,
        db: Session,
        *,
        obj_in: UserCreate,
    ) -> User:
        db_obj = User(
            email=obj_in.email,  # noqa
            hashed_password=get_password_hash(obj_in.password),  # noqa
            roll=obj_in.roll,
            full_name=obj_in.full_name,  # noqa
            dob=obj_in.dob,  # noqa
            teacher_department_id=obj_in.teacher_department_id,  # noqa
            group_id=obj_in.group_id,  # noqa
            user_type=obj_in.user_type,  # noqa
            contact_number=obj_in.contact_number,  # noqa
            address=obj_in.address,  # noqa
            join_year=obj_in.join_year,  # noqa
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)

        if obj_in.teacher_group:
            for item in obj_in.teacher_group:
                association_obj = TeacherGroupCourseAssociation(
                    teacher_id=db_obj.id,
                    group_id=item[0],
                    course_id=item[1],
                )
                db.add(association_obj)
                db.commit()
                db.refresh(association_obj)
                # teacher_group = [
                #     crud_group.get(db=db, id=id) for id in obj_in.teacher_group
                # ]
        db.refresh(db_obj)
        return db_obj

    def verify_user(
        self,
        db: Session,
        *,
        db_obj: User,
    ):
        super().update(db=db, db_obj=db_obj, obj_in={"is_active": True})

    def enable_2fa(
        self,
        db: Session,
        *,
        secret: str,
        db_obj: User,
    ):
        super().update(db=db, db_obj=db_obj, obj_in={"two_fa_secret": secret})

    def disable_2fa(
        self,
        db: Session,
        *,
        db_obj: User,
    ):
        super().update(db=db, db_obj=db_obj, obj_in={"two_fa_secret": None})

    def update(
        self,
        db: Session,
        *,
        db_obj: User,
        obj_in: Union[UserUpdate, Dict[str, Any]],
    ) -> User:
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)

        if "password" in update_data:
            hashed_password = get_password_hash(update_data["password"])
            del update_data["password"]
            update_data["hashed_password"] = hashed_password
        # if (
        #     update_data.get("permissions")
        #     and db_obj.user_type > settings.UserType.ADMIN.value
        # ):
        #     raise HTTPException(403, detail="Error ID: 136")  # Request denied
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
