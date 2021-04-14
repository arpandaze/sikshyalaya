from app.crud.base import CRUDBase
from app.schemas.class_session import ClassSessionCreate, ClassSessionUpdate
from app.models.class_session import ClassSession


class CRUDClassSession(CRUDBase[ClassSession, ClassSessionCreate, ClassSessionUpdate]):
    pass


crud_class_session = CRUDClassSession(ClassSession)
