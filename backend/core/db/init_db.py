from sqlalchemy.orm import Session

import cruds
import schemas
from core import settings
from models import *  # noqa: F401


def init_db(db: Session) -> None:
    user = cruds.crud_user.get_by_email(db, email=settings.FIRST_SUPERUSER)
    if not user:
        user_in = schemas.UserCreate(
            full_name="Yugesh",
            dob="2021-04-14T14:27:12+00:00",
            address="Dhulikhel",
            contact_number="986152526272",
            email=settings.FIRST_SUPERUSER,
            password=settings.FIRST_SUPERUSER_PASSWORD,
            is_superuser=True,
        )
        user = cruds.crud_user.create(db, obj_in=user_in)  # noqa: F841
