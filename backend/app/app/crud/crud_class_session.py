from app.crud.base import CRUDBase
from sqlalchemy.orm import Session
from app.schemas.class_session import ClassSessionCreate, ClassSessionUpdate
from app.models.class_session import ClassSession
from app.crud.crud_user import user

from typing import Any


class CRUDClassSession(CRUDBase[ClassSession, ClassSessionCreate, ClassSessionUpdate]):
    def create(self, db: Session, *, obj_in: ClassSessionCreate) -> Any:
        if obj_in.instructors:
            print(user.get(db=db, id=2))
            instructors = list(
                map(lambda id: user.get(db=db, id=id), obj_in.instructors)
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

    def get_multi(
            self, db: Session, *, skip: int = 0, limit: int = 100, filter: int
    ) -> List[ModelType]:
        return db.query(self.model).offset(skip).limit(limit).all()


crud_class_session = CRUDClassSession(ClassSession)
