from cruds.base import CRUDBase
from models.group import Group
from schemas.group import GroupCreate, GroupUpdate
from schemas.group import Group as GroupSchema
from sqlalchemy.orm import Session
from cruds.course import crud_course
from fastapi.encoders import jsonable_encoder


class CRUDGroup(CRUDBase[Group, GroupCreate, GroupUpdate]):
    def get_by_program_and_sem(self, db: Session, *, program: int, sem: int):
        return (
            db.query(self.model)
            .filter_by(program_id=program)
            .filter_by(sem=sem)
            .first()
        )

    def update(
        self,
        db: Session,
        *,
        db_obj: Group,
        obj_in: GroupCreate,
    ) -> Group:
        if obj_in.course:
            course = [crud_course.get(db=db, id=id) for id in obj_in.course]
        else:
            course = []
        db_obj.course = course
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def create(
        self,
        db: Session,
        *,
        obj_in: GroupCreate,
    ) -> Group:
        if obj_in.course:
            course = [crud_course.get(db=db, id=id) for id in obj_in.course]
        else:
            course = []

        db_obj = Group(program_id=obj_in.program_id, sem=obj_in.sem, course=course)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj


crud_group = CRUDGroup(Group)
