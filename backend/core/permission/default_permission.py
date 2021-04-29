from core.config import settings
from core.db import SessionLocal
from cruds import crud_user_permission
from utils import get_super_admin


def default_permission(user_type: int):
    if (user_type == settings.UserType.SUPERADMIN.value):
        permissions_list = crud_user_permission.get_multi(db=SessionLocal(), limit=-1)
        permissions_list = list(map(lambda x: x.id, permissions_list))
        return permissions_list

    if (user_type == settings.UserType.ADMIN.value):
        permissions_list_name = crud_user_permission.get_multi(db=SessionLocal(), limit=-1)
        permissions_list = list(map(lambda x: x.name, permissions_list_name))
        nono_list = [
            "personal_note_get",
            "personal_note_post",
            "personal_note_update",
            "teacher_note_get",
            "teacher_note_post",
            "teacher_note_update",
        ]
        for item in nono_list:
            permissions_list.pop(nono_list.index(item))
        permissions_list = list(map(lambda x: crud_user_permission.get_by_name(db=SessionLocal(), name=x), permissions_list))
        permissions_list = list(map(lambda x: x.id, permissions_list))
        return permissions_list

    if (user_type == settings.UserType.TEACHER.value):
        yesyes_list = [
            "class_session_get_self",
            "course_get",
            "personal_note_post",
            "personal_note_update",
            "class_session_get",
            "teacher_note_get_self",
            "teacher_note_post",
            "teacher_note_update_self",
            "user_get_self",
            "user_get_self",
        ]
        permissions_list = list(map(lambda x: crud_user_permission.get_by_name(db=SessionLocal(), name=x), yesyes_list))
        permissions_list = list(map(lambda x: x.id, permissions_list))
        return permissions_list

    if (user_type == settings.UserType.STUDENT.value):
        permissions_list = crud_user_permission.get_multi(db=SessionLocal(), limit=-1)
        permissions_list = list(map(lambda x: x.id, permissions_list))
        return permissions_list
