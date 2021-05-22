from sqlalchemy import Column, Integer, ForeignKey, Table

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

teacher_group_association_table = Table(
    "teacher_group_association",
    Base.metadata,
    Column("teacher_id", Integer, ForeignKey("user.id", ondelete="CASCADE")),
    Column("group_id", Integer, ForeignKey("group.id", ondelete="CASCADE")),
)

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
