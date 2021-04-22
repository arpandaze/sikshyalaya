from typing import Optional  # noqa

from pydantic import BaseModel


class ${PascalCaseName}Base(BaseModel):
    name: str
    address: str


class ${PascalCaseName}Create(${PascalCaseName}Base):
    pass


class ${PascalCaseName}Update(${PascalCaseName}Base):
    pass


class ${PascalCaseName}InDBBase(${PascalCaseName}Base):
    id: Optional[int]

    class Config:
        orm_mode = True


class ${PascalCaseName}InDB(${PascalCaseName}InDBBase):
    pass


class ${PascalCaseName}(${PascalCaseName}InDBBase):
    pass
