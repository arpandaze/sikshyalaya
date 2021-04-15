from app.crud.base import CRUDBase
from app.schemas.program import ProgramCreate, ProgramUpdate
from app.models.program import Program


class CRUDProgram(CRUDBase[Program, ProgramCreate, ProgramUpdate]):
    pass


crud_program = CRUDProgram(Program)
