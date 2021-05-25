from typing import Any

from fastapi import APIRouter, Depends
from fastapi.responses import FileResponse
from pydantic.networks import EmailStr

import models
import schemas
from utils import deps

router = APIRouter()

@router.get("/public_file/{file:path}")
async def public_file(
    file: str,
) -> Any:
    return FileResponse(f"uploaded_files/{file}")

