from typing import Any, List

from cruds.base import CRUDBase
from cruds.user import crud_user
from models import ClassSession
from models import User
from schemas import ClassSessionCreate, ClassSessionUpdate
from sqlalchemy.orm import Session
from core.config import settings


class CRUDClassSession(CRUDBase[ClassSession, ClassSessionCreate, ClassSessionUpdate]):
    def create(self, db: Session, *, obj_in: ClassSessionCreate) -> Any:
        if obj_in.instructors:
            instructors = [crud_user.get(db=db, id=id) for id in obj_in.instructors]

        else:
            instructors = []

        db_obj = ClassSession(
            datetime=obj_in.datetime,  # noqa
            is_active=obj_in.is_active,  # noqa
            instructors=instructors,  # noqa
            course_id=obj_in.course_id,  # noqa
            description=obj_in.description,  # noqa
            duration=obj_in.duration,
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def get_user_class_session(
        self, db: Session, user: User, id: int = None
    ) -> List[ClassSession]:
        if user.user_type == settings.UserType.STUDENT.value:
            if not id:
                class_sessions = (
                    db.query(self.model)
                    .filter(ClassSession.group_id == user.group_id)
                    .all()
                )
            else:
                class_sessions = (
                    db.query(self.model)
                    .filter(ClassSession.id == id)
                    .filter(ClassSession.group_id == user.group_id)
                    .first()
                )
        else:  # if user.user_type == settings.UserType.TEACHER.value:
            if not id:
                class_sessions = (
                    db.query(self.model)
                    .filter(ClassSession.instructor.contains(user))
                    .all()
                )
            else:
                class_sessions = (
                    db.query(self.model)
                    .filter(ClassSession.id == id)
                    .filter(ClassSession.instructor.contains(user))
                    .first()
                )

        return class_sessions


crud_class_session = CRUDClassSession(ClassSession)
