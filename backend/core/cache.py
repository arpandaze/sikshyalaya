from functools import wraps
import json

from starlette.responses import Response

from core.db import redis_cache_client
from fastapi import HTTPException
from fastapi.encoders import jsonable_encoder
from typing import Callable


def cache(timeout: int = 600) -> Callable:
    def outer_wrapper(func):
        @wraps(func)
        async def inner_wrapper(*args, **kwargs):
            identifier = f"ec_{func.__name__}_{func.__module__}"
            value = await redis_cache_client.client.get(identifier)

            if value:
                return json.loads(value)
            else:
                ret_val = await func(*args, **kwargs)
                ret_val = jsonable_encoder(ret_val)
                await redis_cache_client.client.set(identifier, json.dumps(ret_val))
                await redis_cache_client.client.expire(identifier, timeout)
                return ret_val

        return inner_wrapper

    return outer_wrapper


# TODO: Response Cache Headers

# def cache_headers(timeout: int = 600, no_cache=False, ) -> Callable:
#     def outer_wrapper(func):
#         @wraps(func)
#         async def inner_wrapper(*args, **kwargs):
#             print(func.__module__)
#             identifier = f"ec_{func.__name__}_{func.__module__}"
#             value = await redis_cache_client.client.get(identifier)

#             if value:
#                 return json.loads(value)
#             else:
#                 ret_val = await func(*args, **kwargs)
#                 ret_val = jsonable_encoder(ret_val)
#                 await redis_cache_client.client.set(identifier, json.dumps(ret_val))
#                 await redis_cache_client.client.expire(identifier, timeout)
#                 return ret_val

#         return inner_wrapper

#     return outer_wrapper
