from sqlalchemy import Column, Integer, String

from core.db import Base
from sqlalchemy import Column, Integer, String


class UserPermission(Base):
    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True, index=True)
    __tablename__ = "userpermission"
