from typing import Any, List

from app.crud.base import CRUDBase
from app.crud.crud_user import crud_user
from app.models import ClassSession
from app.models import User
from app.schemas import ClassSessionCreate, ClassSessionUpdate
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
            duration=obj_in.duration,  # noqa
            group_id=obj_in.group_id,  # noqa
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def get_student_class_sessions(self, db: Session, user: User) -> List[ClassSession]:
        return db.query(self.model).filter(ClassSession.group_id == user.group_id).all()

    def get_teacher_class_sessions(self, db: Session, user: User) -> List[ClassSession]:
        return db.query(self.model).filter(ClassSession.instructors == user.id).all()


crud_class_session = CRUDClassSession(ClassSession)
