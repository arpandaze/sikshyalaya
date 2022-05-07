from .class_session import (
    ClassSession,
    ClassSessionUpdate,
    ClassSessionCreate,
    ClassSessionInDB,
    AttendanceUpdate,
)
from .course import Course, CourseCreate, CourseUpdate, CourseInDB, CourseMin
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
from .two_fa import Two_FA_Confirm
from .user import (
    User,
    UserCreate,
    UserInDB,
    UserUpdate,
    UserReturnMin,
    UserSignUp,
    TeacherShort,
    Name,
)

from .quiz import (
    Quiz,
    QuizCreate,
    QuizUpdate,
    QuizInDB,
    QuizQuestion,
    QuizQuestionCreate,
    QuizQuestionUpdate,
    QuizQuestionInDB,
    QuizQuestionwoutAnswer,
)

from .quiz_answer import (
    QuizAnswer,
    QuizAnswerCreate,
    QuizAnswerUpdate,
    QuizAnswerInDB,
    QuizAnsweronlySelected,
    QuizAnswerwithName,
)

from .file import File, FileCreate, FileUpdate, FileInDB
from .auth import LoginData

from .assignment import Assignment, AssignmentCreate, AssignmentUpdate, AssignmentInDB


from .assignment_upload import (
    AssignmentUpload,
    AssignmentUploadBase,
    AssignmentUploadCreate,
    AssignmentUploadInDB,
    AssignmentUploadInDBBase,
    AssignmentUploadUpdate,
    AssignmentUploadwithName,
)
