from .class_session import (
    ClassSession,
    ClassSessionUpdate,
    ClassSessionCreate,
    ClassSessionInDB,
    AttendanceUpdate,
)
from .course import Course, CourseCreate, CourseUpdate, CourseInDB
from .department import Department, DepartmentCreate, DepartmentUpdate, DepartmentInDB
from .group import Group, GroupCreate, GroupInDB, GroupUpdate, GroupReturn
from .msg import Msg
from .personal_note import (
    PersonalNote,
    PersonalNoteUpdate,
    PersonalNoteCreate,
    PersonalNoteInDB,
)
from .program import Program, ProgramUpdate, ProgramCreate, ProgramInDB
from .school import School, SchoolCreate, SchoolUpdate, SchoolInDB
from .teacher_note import (
    TeacherNote,
    TeacherNoteUpdate,
    TeacherNoteCreate,
    TeacherNoteInDB,
)

from .user_permission import (
    UserPermission,
    UserPermissionCreate,
    UserPermissionUpdate,
    UserPermissionInDB,
)
from .token import Token, TokenPayload
from .user import (
    User,
    UserCreate,
    UserInDB,
    UserUpdate,
    UserReturnMin,
    UserSignUp,
    TeacherShort,
)

from .quiz import (
    Quiz,
    QuizCreate,
    QuizUpdate,
    QuizInDB,
    QuizAnswer,
    QuizAnswerCreate,
    QuizAnswerUpdate,
    QuizAnswerInDB,
    QuizQuestion,
    QuizQuestionCreate,
    QuizQuestionUpdate,
    QuizQuestionInDB,
    QuizQuestionwoutAnswer,
)

from .file import File, FileCreate, FileUpdate, FileInDB
from .auth import LoginData
