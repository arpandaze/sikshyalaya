from sqlalchemy import Column, Integer, ForeignKey, Table
from sqlalchemy.orm import relationship
from sqlalchemy.sql.expression import null

from core.db import Base

# XXX: previously needed for storing courses of user, now migrated to storing course in groups
# user_course_association_table = Table(
#     "user_course_association",
#     Base.metadata,
#     Column("course_id", Integer, ForeignKey("course.id")),
#     Column("user_id", Integer, ForeignKey("user.id")),
# )

user_class_session_association_table = Table(
    "user_class_session_association",
    Base.metadata,
    Column(
        "class_session_id", Integer, ForeignKey("class_session.id", ondelete="CASCADE")
    ),
    Column("user_id", Integer, ForeignKey("user.id", ondelete="CASCADE")),
)

attendant_class_session_association_table = Table(
    "attendant_class_session_association",
    Base.metadata,
    Column(
        "class_session_id", Integer, ForeignKey("class_session.id", ondelete="CASCADE")
    ),
    Column("user_id", Integer, ForeignKey("user.id", ondelete="CASCADE")),
)

user_permission_association_table = Table(
    "user_permission_association",
    Base.metadata,
    Column(
        "permission_id", Integer, ForeignKey("userpermission.id", ondelete="CASCADE")
    ),
    Column("user_id", Integer, ForeignKey("user.id", ondelete="CASCADE")),
)

group_course_association_table = Table(
    "group_course_association",
    Base.metadata,
    Column("course_id", Integer, ForeignKey("course.id", ondelete="CASCADE")),
    Column("group_id", Integer, ForeignKey("group.id", ondelete="CASCADE")),
)

# teacher_group_association_table = Table(
#     "teacher_group_association",
#     Base.metadata,
#     Column("teacher_id", Integer, ForeignKey("user.id", ondelete="CASCADE")),
#     Column("group_id", Integer, ForeignKey("group.id", ondelete="CASCADE")),
# )


class TeacherGroupCourseAssociation(Base):
    teacher_id = Column(
        Integer, ForeignKey("user.id", ondelete="CASCADE"), primary_key=True
    )
    group_id = Column(
        Integer, ForeignKey("group.id", ondelete="CASCADE"), primary_key=True
    )
    course_id = Column(
        Integer, ForeignKey("course.id", ondelete="CASCADE"), nullable=False
    )
    group = relationship("Group")
    teacher = relationship("User")
    course = relationship("Course")
    __tablename__ = "teacher_group_course_association"


group_quiz_association_table = Table(
    "group_quiz_association",
    Base.metadata,
    Column("group_id", Integer, ForeignKey("group.id", ondelete="CASCADE")),
    Column("quiz_id", Integer, ForeignKey("quiz.id", ondelete="CASCADE")),
)


instructor_quiz_association_table = Table(
    "instructor_quiz_association",
    Base.metadata,
    Column("instructor_id", Integer, ForeignKey("user.id", ondelete="CASCADE")),
    Column("quiz_id", Integer, ForeignKey("quiz.id", ondelete="CASCADE")),
)


assignment_group_association_table = Table(
    "assignment_group_association",
    Base.metadata,
    Column("group_id", Integer, ForeignKey("group.id", ondelete="CASCADE")),
    Column("assignment_id", Integer, ForeignKey("assignment.id", ondelete="CASCADE")),
)

assignment_instructor_association_table = Table(
    "assignment_instructor_association",
    Base.metadata, 
    Column("instructor_id", Integer, ForeignKey("user.id", ondelete="CASCADE")),
    Column("assignment_id", Integer, ForeignKey("assignment.id", ondelete="CASCADE"))
)