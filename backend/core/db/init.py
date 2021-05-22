import re

from sqlalchemy.orm import Session

import cruds
import schemas
from core import settings
from core.db import Base, SessionLocal
from cruds import crud_user
from models import *  # noqa: F401


def pascal_case_to_snake(name):
    name = re.sub("(.)([A-Z][a-z]+)", r"\1_\2", name)
    return re.sub("([a-z0-9])([A-Z])", r"\1_\2", name).lower()


def init_db(db: Session = SessionLocal()) -> None:
    super_user = cruds.crud_user.get_by_email(db, email=settings.FIRST_SUPERUSER)
    if not super_user:
        user_in = schemas.UserCreate(
            full_name="Yugesh",
            dob="2021-04-14",
            address="Dhulikhel",
            contact_number="986152526272",
            email=settings.FIRST_SUPERUSER,
            password=settings.FIRST_SUPERUSER_PASSWORD,
            is_superuser=True,
            user_type=1,
        )
        super_user = cruds.crud_user.create(db, obj_in=user_in)  # noqa: F841


# def init_permissions(db: Session = SessionLocal()) -> None:
#     super_user = crud_user.get_by_id(db, id=1)
#     for model in Base.__subclasses__():
#         try:
#             name = pascal_case_to_snake(model.__name__)
#             permission_create = schemas.UserPermissionCreate(name=f"{name}_create")
#             permission_create = cruds.crud_user_permission.create(
#                 db,
#                 obj_in=permission_create,
#             )
#         except Exception:  # noqa
#             pass

#         try:
#             name = pascal_case_to_snake(model.__name__)
#             permission_update = schemas.UserPermissionCreate(name=f"{name}_update")
#             permission_update = cruds.crud_user_permission.create(
#                 db,
#                 obj_in=permission_update,
#             )
#         except Exception:  # noqa
#             pass

#         try:
#             name = pascal_case_to_snake(model.__name__)
#             permission_retrieve = schemas.UserPermissionCreate(name=f"{name}_get")
#             permission_retrieve = cruds.crud_user_permission.create(
#                 db,
#                 obj_in=permission_retrieve,
#             )
#         except Exception:  # noqa
#             pass
#         try:
#             name = pascal_case_to_snake(model.__name__)
#             permission_retrieve = schemas.UserPermissionCreate(name=f"{name}_get_self")
#             permission_retrieve = cruds.crud_user_permission.create(
#                 db,
#                 obj_in=permission_retrieve,
#             )
#         except Exception:  # noqa
#             pass

#         try:
#             name = pascal_case_to_snake(model.__name__)
#             permission_retrieve = schemas.UserPermissionCreate(
#                 name=f"{name}_update_self"
#             )
#             permission_retrieve = cruds.crud_user_permission.create(
#                 db,
#                 obj_in=permission_retrieve,
#             )
#         except Exception:  # noqa
#             pass
