from typing import Dict, Generator

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from core.config import settings
from core.db import SessionLocal
from misc.scripts.launch import app
from cruds import crud_user
from schemas import user as user_schemas
import datetime
import requests


headers = {
    "accept": "application/json",
    "Content-Type": "application/json",
}


@pytest.fixture(scope="session")
def db() -> Generator:
    yield SessionLocal()


@pytest.fixture(scope="session")
def super_user_client() -> Generator:
    db = SessionLocal()
    super_user = user_schemas.UserCreate(
        email="test_superadmin@test.local",
        user_type=1,
        password="test",
        full_name="Test Super Admin",
        is_active=True,
        address="Test Land",
        contact_number="9841111111",
        dob=datetime.datetime(2021, 1, 1),
        join_year=2021,
    )
    super_user_obj = crud_user.create(db=db, obj_in=super_user)
    crud_user.verify_user(db=db, db_obj=super_user_obj)

    data = {
        "username": "test_superadmin@test.local",
        "password": "test",
        "remember_me": True,
    }

    super_user_cookies = None
    with TestClient(app) as c:
        req = c.post(
            f"{settings.BACKEND_URL_BASE}{settings.API_V1_STR}/auth/web/",
            json=data,
        )
        super_user_cookies = req.cookies

    assert req.status_code == 200
    assert req.cookies.get("session"), "Cookie not returned!"

    with TestClient(app) as c:
        c.cookies = super_user_cookies
        yield c

    crud_user.remove(db=SessionLocal(), id=super_user_obj.id)


@pytest.fixture(scope="session")
def client() -> Generator:
    with TestClient(app) as c:
        yield c
