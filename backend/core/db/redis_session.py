import aioredis
from redis.client import Redis

from core import settings


class RedisClient:
    def __init__(self, db: int = 0):
        self.redis_client = None
        self.db = db

    async def initilize(self):
        self.redis_client = await aioredis.create_redis_pool(
            f"redis://{settings.REDIS_PASSWORD}@{settings.REDIS_SERVER}/{self.db}"
        )

    async def close(self):
        self.redis_client.close()
        await self.redis_client.wait_closed()


class RedisBlacklistClient(Redis):
    def __init__(self):
        super().__init__(db=0)


class RedisSessionClient(Redis):
    def __init__(self):
        super().__init__(db=1)


class RedisThrottleClient(Redis):
    def __init__(self):
        super().__init__(db=2)


class RedisCacheClient(Redis):
    def __init__(self, db: int = 0):
        super().__init__(db=3)


redis_session_client = RedisSessionClient()
redis_blacklist_client = RedisBlacklistClient()
redis_throttle_client = RedisThrottleClient()
redis_cache_client = RedisCacheClient()
