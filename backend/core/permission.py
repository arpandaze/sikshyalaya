from functools import wraps

from core.db import redis_throttle_client
from fastapi import HTTPException
from typing import Callable

def permission() -> Callable:
    def outer_wrapper(func):
        @wraps(func)
        async def inner_wrapper(*args, **kwargs):
            client_ip = kwargs.get("request").client.host
            identifier = f"ip_th_{client_ip}_{func.__name__}"
            current_count = redis_throttle_client.get(identifier)
            if (current_count == None):
                redis_throttle_client.set(identifier, 1, ex=per)
            elif(int(current_count.decode('utf-8')) < rate):
                redis_throttle_client.incr(identifier, amount=1)
            else:
                raise HTTPException(status_code=403, detail="Too many requests!")
            return await func(*args, **kwargs)
        return inner_wrapper
    return outer_wrapper


