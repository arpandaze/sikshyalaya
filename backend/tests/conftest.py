from typing import Dict, Generator

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from core.config import settings
from core.db import SessionLocal
from scripts.launch import app
from cruds import crud_user
from schemas import user as user_schemas
import datetime


@pytest.fixture(scope="session")
def db() -> Generator:
    yield SessionLocal()


@pytest.fixture(scope="module")
def client() -> Generator:
    db = SessionLocal()
    super_user = user_schemas.UserCreate(
        email="test_superadmin@test.com",
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

    with TestClient(app) as c:
        yield c

    crud_user.remove(db=SessionLocal(), id=super_user_obj.id)
