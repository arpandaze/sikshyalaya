from core.config import settings
from core.db import Base
from sqlalchemy import (
    Boolean,
    Column,
    Integer,
    SmallInteger,
    String,
    ForeignKey,
    DateTime,
)
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import relationship

from .association_tables import (
    user_course_association_table,
    user_permission_association_table,
)


class User(Base):
    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, index=True)
    email = Column(String, index=True, nullable=False)
    group_id = Column(Integer, ForeignKey("group.id"))
    group = relationship("Group", backref="users")
    permission = relationship(
        "UserPermission", secondary=user_permission_association_table
    )
    enrolled_course = relationship(
        "Course", secondary=user_course_association_table, backref="users"
    )
    dob = Column(DateTime, nullable=False)
    address = Column(String(length=128), nullable=False)
    contact_number = Column(String(length=32), index=True, nullable=False)

    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean(), default=True)
    user_type = Column(
        SmallInteger, default=settings.UserType.STUDENT.value, nullable=False
    )

    @hybrid_property
    def is_superuser(self):
        if self.user_type == settings.UserType.SUPERADMIN.value:
            return True
        else:
            return False

    __tablename__ = "user"