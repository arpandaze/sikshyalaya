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
            identifier = f"endpoint_cache_{func.__name__}"
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