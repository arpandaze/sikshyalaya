import enum
import os
from typing import List, Optional
import yaml

from pydantic import (
    AnyHttpUrl,
    BaseSettings,
    EmailStr,
    PostgresDsn,
)


class Settings(BaseSettings):
    API_V1_STR: str
    SECRET_KEY: str
    SESSION_EXPIRE_TIME: int
    SESSION_EXPIRE_TIME_EXTENDED: int
    TWO_FA_TIMEOUT: int
    PASSWORD_LESS_CREATE_TIMEOUT: int
    SERVER_NAME: str

    PROTOCAL: str
    MODE: str

    BACKEND_HOST: str
    BACKEND_PORT: int

    @property
    def BACKEND_URL_BASE(self):
        if self.BACKEND_PORT == 80:
            return f"{self.PROTOCAL}://{self.BACKEND_HOST}"
        else:
            return f"{self.PROTOCAL}://{self.BACKEND_HOST}:{self.BACKEND_PORT}"

    STATIC_HOST: str
    STATIC_PORT: int

    @property
    def STATIC_URL_BASE(self):
        if self.STATIC_PORT == 80:
            return f"{self.PROTOCAL}://{self.STATIC_HOST}"
        else:
            return f"{self.PROTOCAL}://{self.STATIC_HOST}:{self.STATIC_PORT}"

    FRONTEND_HOST: str
    FRONTEND_PORT: int

    @property
    def FRONTEND_URL_BASE(self):
        if self.FRONTEND_PORT == 80:
            return f"{self.PROTOCAL}://{self.FRONTEND_HOST}"
        else:
            return f"{self.PROTOCAL}://{self.FRONTEND_HOST}:{self.FRONTEND_PORT}"

    UPLOAD_DIR_ROOT: str

    WORKERS: int

    @property
    def DEV_MODE(self):
        if self.MODE == "dev":
            return True
        else:
            return False

    BACKEND_CORS_ORIGINS: List[AnyHttpUrl]

    ALLOWED_EMAIL_HOST: List[str]

    PROJECT_NAME: str

    POSTGRES_SERVER: str
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_DB: str

    @property
    def POSTGRES_DATABASE_URI(self):
        return PostgresDsn.build(
            scheme="postgresql",
            user=self.POSTGRES_USER,
            password=self.POSTGRES_PASSWORD,
            host=self.POSTGRES_SERVER,
            path=f"/{self.POSTGRES_DB or ''}",
        )

    REDIS_HOST: str
    REDIS_PORT: str
    REDIS_PASSWORD: str

    SMTP_TLS: bool
    SMTP_PORT: Optional[int]
    SMTP_HOST: Optional[str]
    SMTP_USER: Optional[str]
    SMTP_PASSWORD: Optional[str]

    EMAILS_FROM_EMAIL: Optional[EmailStr]

    @property
    def EMAILS_FROM_NAME(self):
        return self.PROJECT_NAME

    EMAIL_RESET_TOKEN_EXPIRE_HOURS: int = 48
    EMAIL_VERIFY_EXPIRE_HOURS: int = 48
    EMAIL_TEMPLATES_DIR: str

    @property
    def EMAILS_ENABLED(self):
        return bool(
            self.SMTP_HOST
            and self.SMTP_PORT
            and self.EMAILS_FROM_EMAIL
        )

    FIRST_SUPERUSER: EmailStr
    FIRST_SUPERUSER_PASSWORD: str
    USERS_OPEN_REGISTRATION: bool

    class UserType(enum.Enum):
        SUPERADMIN: int = 1
        ADMIN: int = 2
        TEACHER: int = 3
        STUDENT: int = 4

    class Config:
        case_sensitive = True


configs = {}

with open("etc/base.yml", "r") as base_config_file:
    configs = yaml.load(base_config_file.read(), yaml.Loader)

config_path = os.environ.get("CONFIG_PATH") or "etc/dev.yml"

with open(config_path, "r") as config_file:
    custom_configs = yaml.load(config_file.read(), yaml.Loader)
    configs.update(custom_configs)

settings = Settings(**configs)
