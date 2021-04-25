from functools import wraps

from typing import Callable
from core.config import settings


def check_permission(func) -> Callable:
    @wraps(func)
    def inner_wrapper(*args, **kwargs):
        # from cruds import crud_user
        from cruds import crud_user_permission

        model_name = args[0].model.__name__
        req_user = kwargs.get("req_user")

        inner_func_name = func.__name__

        if req_user.user_type == settings.UserType.SUPERADMIN.value:
            return func(*args, **kwargs)

        else:
            for permission in req_user.permission:

                permission_name = crud_user_permission.get_by_id(args[1], id=permission)
                permission_name_sub = permission_name[-8:]

                if model_name == permission_name[: len(model_name) + 1]:

                    operation = inner_func_name[0:4]
                    if operation == permission_name_sub:
                        return func(*args, **kwargs)

                    operation = inner_func_name[0:7]
                    if operation == permission_name_sub:
                        return func(*args, **kwargs)

    return inner_wrapper
