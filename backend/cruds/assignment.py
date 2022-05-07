from cruds.base import CRUDBase
from schemas.assignment import AssignmentCreate, AssignmentUpdate
from models.assignment import Assignment
from sqlalchemy.orm import Session
from cruds import crud_user, crud_group
from models import User
from typing import Any


class CRUDAssignment(CRUDBase[Assignment, AssignmentCreate, AssignmentUpdate]):
    def create(self, db: Session, *, obj_in: AssignmentCreate) -> Any:
        if obj_in.instructor:
            instructor = [crud_user.get(db=db, id=id) for id in obj_in.instructor]
        else:
            instructor = []

        if obj_in.group:
            group = [crud_group.get(db=db, id=id) for id in obj_in.group]
        else:
            group = []

        db_obj = Assignment(
            due_date=obj_in.due_date,
            marks=obj_in.marks,
            title=obj_in.title,
            contents=obj_in.contents,
            instructor=instructor,
            group=group,
            course_id=obj_in.course_id,
        )

        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def get_quiz_by_group_id(self, db: Session, *, group: int) -> Any:
        return db.query(self.model).filter(self.model.group.contains(group)).all()

    def get_quiz_by_instructor_id(self, db: Session, *, user: User) -> Any:
        return db.query(self.model).filter(self.model.instructor.contains(user)).all()


crud_assignment = CRUDAssignment(Assignment)
