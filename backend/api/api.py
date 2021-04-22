from fastapi import APIRouter

from api.endpoints import (
    program,
    teacher_note,
    users,
)
from api.endpoints import login, utils, course, school, department, class_session, personal_note

api_router = APIRouter()
api_router.include_router(login.router, tags=["login"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(utils.router, prefix="/utils", tags=["utils"])
api_router.include_router(school.router, prefix="/school", tags=["schools"])
api_router.include_router(course.router, prefix="/course", tags=["courses"])
api_router.include_router(department.router, prefix="/deparment", tags=["departments"])
api_router.include_router(
    class_session.router, prefix="/class_session", tags=["class_sessions"]
)
api_router.include_router(
    personal_note.router, prefix="/personal_note", tags=["personal_notes"]
)
api_router.include_router(program.router, prefix="/program", tags=["programs"])
api_router.include_router(
    teacher_note.router, prefix="/teacher_note", tags=["teacher_notes"]
)
