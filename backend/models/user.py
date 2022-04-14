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
    Date,
)
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import relationship


class User(Base):
    id = Column(Integer, primary_key=True, index=True)
    profile_image = Column(String(100))
    full_name = Column(String, index=True)
    email = Column(String, index=True, nullable=False, unique=True)

    two_fa_secret = Column(String)

    roll = Column(SmallInteger, nullable=True)

    group_id = Column(Integer, ForeignKey("group.id", ondelete="cascade"))
    group = relationship("Group", backref="student")

    teacher_group = relationship(
        "TeacherGroupCourseAssociation", back_populates="teacher"
    )
    teacher_department_id = Column(
        ForeignKey("department.id", ondelete="SET NULL"), nullable=True
    )
    teacher_department = relationship("Department", backref="teachers")

    dob = Column(Date, nullable=False)
    address = Column(String(length=128), nullable=False)
    contact_number = Column(String(length=32), index=True, nullable=False)

    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean(), default=False)
    user_type = Column(
        SmallInteger,
        default=settings.UserType.STUDENT.value,
        nullable=False,
        index=True,
    )

    join_year = Column(SmallInteger)

    @hybrid_property
    def is_superuser(self):
        if self.user_type == settings.UserType.SUPERADMIN.value:
            return True
        else:
            return False

    __tablename__ = "user"
