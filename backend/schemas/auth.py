from pydantic import BaseModel


class LoginData(BaseModel):
    username: str
    password: str
    remember_me: bool