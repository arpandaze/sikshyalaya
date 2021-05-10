from cruds.base import CRUDBase
from schemas.${snake_case_name} import ${PascalCaseName}Create, ${PascalCaseName}Update
from models.${snake_case_name} import ${PascalCaseName}


class CRUD${PascalCaseName}(CRUDBase[${PascalCaseName}, ${PascalCaseName}Create, ${PascalCaseName}Update]):
    pass


crud_${snake_case_name} = CRUD${PascalCaseName}(${PascalCaseName})
