from cruds.base import CRUDBase
from schemas.file import FileCreate, FileUpdate
from models.file import File


class CRUDFile(CRUDBase[File, FileCreate, FileUpdate]):
    pass


crud_file = CRUDFile(File)
