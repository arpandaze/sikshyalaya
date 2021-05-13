from fastapi.param_functions import Form
from pydantic import BaseModel


class LoginForm:
    def __init__(
        self,
        username: str = Form(...),
        password: str = Form(...),
        remember_me: bool = Form(...),
    ):
        self.username = username
        self.password = password
        self.remember_me = remember_me


class LoginData(BaseModel):
    username: str
    password: str
    remember_me: bool
