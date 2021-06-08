import aioredis

from core import settings


class RedisClient:
    def __init__(self, db: int = 0):
        self.client = None
        self.db = db

    async def initialize(self):
        self.client = await aioredis.create_redis_pool(
            f"redis://{settings.REDIS_HOST}",
            password=settings.REDIS_PASSWORD,
            db=self.db,
        )

    async def close(self):
        self.client.close()
        await self.client.wait_closed()


class RedisChatClient(RedisClient):
    def __init__(self):
        super().__init__(db=0)


class RedisSessionClient(RedisClient):
    def __init__(self):
        super().__init__(db=1)


class RedisThrottleClient(RedisClient):
    def __init__(self):
        super().__init__(db=2)


class RedisCacheClient(RedisClient):
    def __init__(self):
        super().__init__(db=3)


class RedisGeneral(RedisClient):
    def __init__(self):
        super().__init__(db=4)


redis_session_client = RedisSessionClient()
redis_chat_client = RedisChatClient()
redis_throttle_client = RedisThrottleClient()
redis_cache_client = RedisCacheClient()
redis_general = RedisGeneral()
