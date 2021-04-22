from .crud_user import crud_user

from .crud_course import crud_course
from .crud_school import crud_school
from .crud_group import crud_group
from .crud_department import crud_department
from .crud_personal_note import crud_personal_note
from .crud_program import crud_program
from .crud_teacher_note import crud_teacher_note
from .crud_class_session import crud_class_session
from .crud_user_permission import crud_user_permission


# For a new basic set of CRUD operations you could just do

# from .base import CRUDBase
# from app.models.item import Item
# from app.schemas.item import ItemCreate, ItemUpdate

# item = CRUDBase[Item, ItemCreate, ItemUpdate](Item)
