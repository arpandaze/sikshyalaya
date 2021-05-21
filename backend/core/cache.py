from functools import wraps

from core.db import redis_cache_client
from fastapi import HTTPException
from typing import Callable


def cache(timeout: int = 600) -> Callable:
    def outer_wrapper(func):
        @wraps(func)
        async def inner_wrapper(*args, **kwargs):
            resp = kwargs.get("response")
            print(resp.da)
            identifier = f"endpoint_cache_{func.__name__}"
            value = await redis_cache_client.client.get(identifier)
            print(f"redis: {value}")

            if value:
                return value
            else:
                ret_val = await func(*args, **kwargs)
                print(f"ret: {ret_val}")
                await redis_cache_client.client.set(identifier, ret_val)
                await redis_cache_client.client.expire(identifier, timeout)
                return ret_val

        return inner_wrapper

    return outer_wrapper