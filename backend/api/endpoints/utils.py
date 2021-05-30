from typing import Any

from fastapi import APIRouter, Depends
from fastapi.responses import FileResponse
from pydantic.networks import EmailStr

import models
import schemas
from utils import deps

router = APIRouter()


@router.get("/ping")
async def ping() -> Any:
    return {"msg": "pong"}
