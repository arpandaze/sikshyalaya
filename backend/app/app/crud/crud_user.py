from typing import Any, Dict, Optional, Union

from sqlalchemy.orm import Session

from app.core.security import get_password_hash, verify_password
from app.crud.base import CRUDBase
from app.crud.crud_course import crud_course
from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate


class CRUDUser(CRUDBase[User, UserCreate, UserUpdate]):
    def get_by_email(self, db: Session, *, email: str) -> Optional[User]:
        return db.query(User).filter(User.email == email).first()

    def create(self, db: Session, *, obj_in: UserCreate) -> User:
        courses = list(map(lambda id: crud_course.get(db=db, id=id), obj_in.course))
        db_obj = User(
            email=obj_in.email,  # noqa
            hashed_password=get_password_hash(obj_in.password),  # noqa
            full_name=obj_in.full_name,  # noqa
            is_superuser=obj_in.is_superuser,  # noqa
            auth_provider=obj_in.auth_provider,  # noqa
            dob=obj_in.dob,  # noqa
            enrolled_course=courses,  # noqa
            contact_number=obj_in.contact_number,  # noqa
            address=obj_in.address,  # noqa
            is_teacher=obj_in.is_teacher,  # noqa
            sem=obj_in.sem,  # noqa
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
        return user.is_superuser


user = CRUDUser(User)
