from cruds.base import CRUDBase
from models.group import Group
from schemas.group import GroupCreate, GroupUpdate


class CRUDGroup(CRUDBase[Group, GroupCreate, GroupUpdate]):
    pass


crud_group = CRUDGroup(Group)
