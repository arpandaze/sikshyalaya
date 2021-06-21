from typing import Any, List

from cruds.base import CRUDBase
from cruds.user import crud_user
from models import ClassSession
from models import User
from schemas import ClassSessionCreate, ClassSessionUpdate, AttendanceUpdate
from sqlalchemy.orm import Session
from core.config import settings


class CRUDClassSession(CRUDBase[ClassSession, ClassSessionCreate, ClassSessionUpdate]):
    def create(self, db: Session, *, obj_in: ClassSessionCreate) -> Any:
        if obj_in.instructor:
            instructor = [crud_user.get(db=db, id=id) for id in obj_in.instructor]

        else:
            instructor = []

        db_obj = ClassSession(
            start_time=obj_in.start_time,  # noqa
            end_time=obj_in.end_time,  # noqa
            instructor=instructor,  # noqa
            course_id=obj_in.course_id,  # noqa
            description=obj_in.description,  # noqa
            group_id=obj_in.group_id,
        )

        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def attendance_update(
        self, db: Session, *, db_obj: ClassSession, obj_in: AttendanceUpdate
    ) -> Any:
        students = [crud_user.get_by_id(db=db, id=item) for item in obj_in.attendant]
        db_obj.attendant = students
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def get_user_class_session(
        self, db: Session, user: User, id: int = None
    ) -> List[ClassSession]:
        if user.user_type == settings.UserType.STUDENT.value:
            class_sessions = db.query(self.model)

            if id:
                class_sessions = class_sessions.filter(ClassSession.id == id)

            class_sessions = class_sessions.filter(
                ClassSession.group_id == user.group_id
            )

            if id:
                return class_sessions.first()
            else:
                return class_sessions.all()

        else:  # if user.user_type == settings.UserType.TEACHER.value:
            # TODO Fix ^^
            class_sessions = db.query(self.model).filter(
                ClassSession.instructor.contains(user)
            )
            if not id:
                return class_sessions.all()
            else:
                return class_sessions.filter(ClassSession.id == id).first()

        return class_sessions


crud_class_session = CRUDClassSession(ClassSession)
