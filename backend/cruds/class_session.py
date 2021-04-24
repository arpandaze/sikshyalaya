from typing import Any, List

from cruds.base import CRUDBase
from cruds.user import crud_user
from models import ClassSession
from models import User
from schemas import ClassSessionCreate, ClassSessionUpdate
from sqlalchemy.orm import Session


class CRUDClassSession(CRUDBase[ClassSession, ClassSessionCreate, ClassSessionUpdate]):
    def create(self, db: Session, *, obj_in: ClassSessionCreate) -> Any:
        if obj_in.instructors:
            print(crud_user.get(db=db, id=2))
            instructors = list(
                map(lambda id: crud_user.get(db=db, id=id), obj_in.instructors)
            )
        else:
            instructors = []

        db_obj = ClassSession(
            datetime=obj_in.datetime,  # noqa
            is_active=obj_in.is_active,  # noqa
            instructors=instructors,  # noqa
            course_id=obj_in.course_id,  # noqa
            description=obj_in.description,  # noqa
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def get_user_class_sessions(self, db: Session, user: User) -> List[ClassSession]:
        return db.query(self.model).filter(ClassSession.group_id == user.group_id).all()


crud_class_session = CRUDClassSession(ClassSession)
