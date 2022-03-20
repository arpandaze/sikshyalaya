import uvicorn
import os
from fastapi import FastAPI
from fastapi.openapi.docs import (
    get_swagger_ui_html,
    get_swagger_ui_oauth2_redirect_html,
)
from starlette.middleware.cors import CORSMiddleware

from api import router
from core.config import settings
from core.db import (
    init,
    redis_cache_client,
    redis_chat_client,
    redis_general,
    redis_session_client,
    redis_throttle_client,
)

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url=None,
)


@app.on_event("startup")
async def startup():
    await redis_cache_client.initialize()
    await redis_chat_client.initialize()
    await redis_throttle_client.initialize()
    await redis_session_client.initialize()
    await redis_general.initialize()
    init.init_db()


@app.on_event("shutdown")
async def shutdown():
    await redis_cache_client.close()
    await redis_chat_client.close()
    await redis_throttle_client.close()
    await redis_session_client.close()
    await redis_general.close()


@app.get("/docs", include_in_schema=False)
async def custom_swagger_ui_html():
    return get_swagger_ui_html(
        openapi_url=app.openapi_url,
        title=app.title + " - API Documentaion",
        oauth2_redirect_url=app.swagger_ui_oauth2_redirect_url,
        swagger_js_url=f"{settings.STATIC_URL_BASE}/static/swagger-ui-bundle.js",
        swagger_css_url=f"{settings.STATIC_URL_BASE}/static/swagger-ui.css",
    )


@app.get(app.swagger_ui_oauth2_redirect_url, include_in_schema=False)
async def swagger_ui_redirect():
    return get_swagger_ui_oauth2_redirect_html()


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
    reload_blacklist = ["tests", ".pytest_cache"]
    reload_dirs = os.listdir()

    for dir in reload_blacklist:
        try:
            reload_dirs.remove(dir)
        except:
            pass

    uvicorn.run(
        "misc.scripts.launch:app",
        host=settings.BACKEND_HOST,
        port=settings.BACKEND_PORT,
        reload=settings.DEV_MODE,
        reload_dirs=reload_dirs,
        debug=settings.DEV_MODE,
        workers=settings.WORKERS,
    )


if __name__ == "__main__":
    run()
