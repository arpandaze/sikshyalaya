from typing import Optional

from pydantic import BaseModel


class Token(BaseModel):
    session: str


class TokenPayload(BaseModel):
    sub: Optional[int] = None


class SessionToken(BaseModel):
    session_token: str
