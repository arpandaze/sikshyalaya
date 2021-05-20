import uvicorn
from fastapi import FastAPI
from core.db import (
    redis_cache_client,
    redis_blacklist_client,
    redis_throttle_client,
    redis_session_client,
    redis_general,
)
from core.db import init
from api import router
from core.config import settings
from starlette.middleware.cors import CORSMiddleware

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
)


@app.on_event("startup")
async def startup():
    await redis_cache_client.initialize()
    await redis_blacklist_client.initialize()
    await redis_throttle_client.initialize()
    await redis_session_client.initialize()
    await redis_general.initialize()
    init.init_db()


@app.on_event("shutdown")
async def shutdown():
    await redis_cache_client.close()
    await redis_blacklist_client.close()
    await redis_throttle_client.close()
    await redis_session_client.close()
    await redis_general.close()


if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    pass

app.include_router(router, prefix=settings.API_V1_STR)


def run():
    uvicorn.run(
        "scripts.launch:app",
        host=settings.UVICORN_HOST,
        port=settings.UVICORN_PORT,
        reload=True if settings.DEV_MODE else False,
        debug=True if settings.DEV_MODE else False,
        workers=settings.UVICORN_WORKERS,
    )


if __name__ == "__main__":
    run()