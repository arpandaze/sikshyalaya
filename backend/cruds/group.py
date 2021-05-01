from cruds.base import CRUDBase
from models.group import Group
from schemas.group import GroupCreate, GroupUpdate
from sqlalchemy.orm import Session


class CRUDGroup(CRUDBase[Group, GroupCreate, GroupUpdate]):
    def create(
        self,
        db: Session,
        *,
        obj_in: GroupCreate,
    ) -> Group:
        if obj_in.course:
            course = list(map(lambda id: crud_group.get(db=db, id=id), obj_in.course))

        else:
            course = []

        db_obj = Group(program_id=obj_in.program_id, sem=obj_in.sem, course=course)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj


crud_group = CRUDGroup(Group)
