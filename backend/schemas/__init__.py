from .class_session import (
    ClassSession,
    ClassSessionUpdate,
    ClassSessionCreate,
    ClassSessionInDB,
)
from .course import Course, CourseCreate, CourseUpdate, CourseInDB
from .department import Department, DepartmentCreate, DepartmentUpdate, DepartmentInDB
from .group import Group, GroupCreate, GroupInDB, GroupUpdate
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
from .token import Token, TokenPayload
from .user import User, UserCreate, UserInDB, UserUpdate
