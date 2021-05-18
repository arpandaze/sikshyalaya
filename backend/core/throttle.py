from functools import wraps

from core.db import redis_throttle_client
from fastapi import HTTPException
from typing import Callable


def ip_throttle(rate: int, per: int = 86400) -> Callable:
    """
    Decorater used to throttle incoming requests based on IP Address

    Parameters
    ----------
    rate : int, required
        Rate value for the throttling.

    per : int, optional
        Rate limit expiry time (in seconds) (default is 86400 ie. 1 day)


    Raises
    ------
    HTTPException(status_code=429)
        If throttle limit is reached and the request is blocked
    """

    def outer_wrapper(func):
        @wraps(func)
        async def inner_wrapper(*args, **kwargs):
            client_ip = kwargs.get(
                "request"
            ).client.host  # FIXME - Proxy might mess this up. Might need to look X-HTTP-FORWARDED. Works locally
            identifier = f"ip_th_{client_ip}_{func.__name__}_{per}"
            current_count = await redis_throttle_client.client.get(identifier)

            if not current_count:
                await redis_throttle_client.client.set(identifier, 1, expire=per)

            elif not int(current_count.decode("utf-8")) <= rate:
                raise HTTPException(
                    status_code=429, detail="Error ID: 133"
                )  # Too many requests!

            ret_val = await func(*args, **kwargs)
            await redis_throttle_client.client.incr(identifier)
            return ret_val

        return inner_wrapper

    return outer_wrapper


def user_throttle(rate: int, per: int = 86400) -> Callable:
    """
    Decorater used to throttle incoming requests based on User

    Parameters
    ----------
    rate : int, required
        Rate value for the throttling.

    per : int, optional
        Rate limit expiry time (in seconds) (default is 86400 ie. 1 day)


    Raises
    ------
    HTTPException(status_code=429)
        If throttle limit is reached and the request is blocked
    """

    def outer_wrapper(func):
        @wraps(func)
        async def inner_wrapper(*args, **kwargs):
            client = kwargs.get("current_user")

            if not client:
                raise HTTPException(
                    status_code=429, detail="Error ID: 134"
                )  # User not logged in!

            identifier = f"user_th_{client}_{func.__name__}"
            current_count = await redis_throttle_client.client.get(identifier)
            if current_count == None:
                await redis_throttle_client.client.set(identifier, 1, ex=per)
            elif int(current_count.decode("utf-8")) < rate:
                await redis_throttle_client.client.incr(identifier, amount=1)
            else:
                raise HTTPException(
                    status_code=429, detail="Error ID: 135"
                )  # Too many requests!
            return await func(*args, **kwargs)

        return inner_wrapper

    return outer_wrapper
