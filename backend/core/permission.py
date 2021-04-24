from functools import wraps

from typing import Callable


def check_permission(func) -> Callable:
    @wraps(func)
    def inner_wrapper(*args, **kwargs):
        from cruds import crud_user

        model_name = args[0].model.__name__
        req_user = kwargs.get("req_user")

    return inner_wrapper

