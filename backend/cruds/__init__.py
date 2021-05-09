from .user import crud_user

from .course import crud_course
from .school import crud_school
from .group import crud_group
from .department import crud_department
from .personal_note import crud_personal_note
from .program import crud_program
from .teacher_note import crud_teacher_note
from .class_session import crud_class_session


# For a new basic set of CRUD operations you could just do

# from .base import CRUDBase
# from app.models.item import Item
# from app.schemas.item import ItemCreate, ItemUpdate

# item = CRUDBase[Item, ItemCreate, ItemUpdate](Item)

from .quiz import crud_quiz