from cruds.base import CRUDBase
from schemas.program import ProgramCreate, ProgramUpdate
from models.program import Program


class CRUDProgram(CRUDBase[Program, ProgramCreate, ProgramUpdate]):
    pass


crud_program = CRUDProgram(Program)
