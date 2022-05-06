from fastapi import APIRouter

from api.endpoints import program, quiz_answer, teacher_note, users, group, quiz
from api.endpoints import (
    program,
    users,
    auth,
    two_fa,
    utils,
    course,
    school,
    department,
    class_session,
    personal_note,
    teacher_note,
    assignment,
    assignment_upload,
)

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(
    two_fa.router, prefix="/2fa", tags=["Two Factor Authentication"]
)
api_router.include_router(users.router, prefix="/users", tags=["Users"])
api_router.include_router(utils.router, prefix="/utils", tags=["Utils"])
api_router.include_router(school.router, prefix="/school", tags=["Schools"])
api_router.include_router(course.router, prefix="/course", tags=["Courses"])
api_router.include_router(department.router, prefix="/department", tags=["Departments"])
api_router.include_router(
    class_session.router, prefix="/class_session", tags=["Class Sessions"]
)
api_router.include_router(
    personal_note.router, prefix="/personal_note", tags=["Personal Notes"]
)
api_router.include_router(program.router, prefix="/program", tags=["Programs"])
api_router.include_router(
    teacher_note.router, prefix="/teacher_note", tags=["Teacher Notes"]
)
api_router.include_router(group.router, prefix="/group", tags=["Groups"])
api_router.include_router(quiz.router, prefix="/quiz", tags=["Quizzes"])
api_router.include_router(
    quiz_answer.router, prefix="/quizanswer", tags=["Quiz Answers"]
)
api_router.include_router(assignment.router, prefix="/assignment", tags=["Assignments"])
api_router.include_router(
    assignment_upload.router, prefix="/assignmentupload", tags=["Assignment Uploads"]
)
