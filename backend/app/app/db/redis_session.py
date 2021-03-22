from redis.client import Redis
from app.core.config import settings

redis_blacklist_client = Redis(
    host=settings.REDIS_SERVER,
    port=settings.REDIS_PORT,
    password=settings.REDIS_PASSWORD,
    db=1
)

redis_query_cache_client = Redis(
    host=settings.REDIS_SERVER,
    port=settings.REDIS_PORT,
    password=settings.REDIS_PASSWORD,
    db=2
)

redis_cache_client = Redis(
    host=settings.REDIS_SERVER,
    port=settings.REDIS_PORT,
    password=settings.REDIS_PASSWORD,
    db=3
)

redis_session_client = Redis(
    host=settings.REDIS_SERVER,
    port=settings.REDIS_PORT,
    password=settings.REDIS_PASSWORD,
    db=4
)

redis_throttle_client = Redis(
    host=settings.REDIS_SERVER,
    port=settings.REDIS_PORT,
    password=settings.REDIS_PASSWORD,
    db=5
)
