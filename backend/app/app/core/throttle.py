from functools import wraps

from fastapi import Request
from fastapi import Depends
from app.db.redis_session import redis_throttle_client
from app.core.config import settings
from fastapi import HTTPException
from typing import Callable

def ip_throttle(rate: int, per: int = 86400) -> Callable:
    '''
    Decorater used to throttle incoming requests based on IP Address

    Parameters
    ----------
    rate : int, required
        Rate value for the throttling.

    per : int, optional
        Rate limit expiry time (in seconds) (default is 86400 ie. 1 day)


    Raises
    ------
    HTTPException(status_code=403)
        If throttle limit is reached and the request is blocked
    '''

    def outer_wrapper(func):
        @wraps(func)
        async def inner_wrapper(*args, **kwargs):
            client_ip = kwargs.get("request").client.host # FIXME - Proxy might mess up this. Might need to look X-HTTP-FORWARDED. Works locally
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

def user_throttle(rate: int, per: int = 86400) -> Callable:
    '''
    Decorater used to throttle incoming requests based on User

    Parameters
    ----------
    rate : int, required
        Rate value for the throttling.

    per : int, optional
        Rate limit expiry time (in seconds) (default is 86400 ie. 1 day)


    Raises
    ------
    HTTPException(status_code=403)
        If throttle limit is reached and the request is blocked
    '''
    def outer_wrapper(func):
        @wraps(func)
        async def inner_wrapper(*args, **kwargs):
            client = kwargs.get("current_user")

            if(not client):
                raise HTTPException(status_code=401, detail="User not logged in!")

            identifier = f"user_th_{client}_{func.__name__}"
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

