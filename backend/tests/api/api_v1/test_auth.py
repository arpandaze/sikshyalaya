import json
import time
import base64

import pytest
import requests

from core.config import settings
from fastapi.testclient import TestClient
import email
from cruds import crud_user
import re
import os


MAILHOG_URL = f"http://{settings.SMTP_HOST}:8025/api"


headers = {
    "accept": "application/json",
    "Content-Type": "application/json",
}


def test_signup(client: TestClient) -> None:
    mailhog_history_clear = requests.delete(f"{MAILHOG_URL}/v1/messages")
    assert mailhog_history_clear.status_code == 200, "Mailhog email delete failed"

    data = {
        "email": "test_student@test.local",
        "full_name": "Test User",
        "address": "Testland",
        "group_id": 1,
        "contact_number": "9841111111",
        "dob": "2000-01-01",
        "join_year": 2015,
        "password": "testold",
    }

    response = client.post(
        f"{settings.BACKEND_URL_BASE}{settings.API_V1_STR}/auth/signup/",
        headers=headers,
        json=data,
    )

    assert response.status_code == 200


def test_verification_email(client: TestClient) -> None:
    mailhog_email_req = requests.get(f"{MAILHOG_URL}/v2/messages")

    assert mailhog_email_req.status_code == 200, "Mailhog email request failed"

    emails = mailhog_email_req.json()
    assert emails.get("total") == 1, f'Received {emails.get("total")} emails! Expected 1!'

    verification_email = emails.get("items")[0]

    content = email.message_from_string(verification_email["Raw"]["Data"])
    decoded_email_content = None
    for part in content.walk():
        payload = part.get_payload(decode=True)
        if payload:
            decoded_email_content = payload.decode()

    link = re.findall(
        settings.FRONTEND_URL_BASE+"/verify\?token=.{40}", decoded_email_content
    )[0]
    token = link[-40:]

    assert token, "Token of length 40 not found in the email"

    params = {"token": token}
    verify_req = client.post(
        f"{settings.BACKEND_URL_BASE}{settings.API_V1_STR}/auth/verify/",
        params=params,
    )

    assert verify_req.status_code == 200


def test_web_session_authentication(
    client: TestClient, username=None, password=None, remember_me=None
) -> None:
    data = {
        "username": username or "test_student@test.local",
        "password": password or "testold",
        "remember_me": remember_me or True,
    }

    req = client.post(
        f"{settings.BACKEND_URL_BASE}{settings.API_V1_STR}/auth/web/",
        json=data,
        headers=headers,
    )

    assert req.status_code == 200
    assert req.cookies.get("session"), "Cookie not returned!"


def test_web_session_authentication_fail(client: TestClient) -> None:
    data = {
        "username": "this.user.doesnt.exist@unknown.com",
        "password": "test123",
        "remember_me": True,
    }

    req = client.post(
        f"{settings.BACKEND_URL_BASE}{settings.API_V1_STR}/auth/web/",
        json=data,
        headers=headers,
    )

    assert req.status_code == 401
    assert not req.cookies.get("session"), "Cookie returned on login fail!"


def test_send_reset_email(client: TestClient) -> None:
    data = {
        "email": "test_student@test.local",
    }

    response = client.post(
        f"{settings.BACKEND_URL_BASE}{settings.API_V1_STR}/auth/password-recovery/",
        headers=headers,
        params=data,
    )

    assert response.status_code == 200


def test_reset_password(client: TestClient) -> None:

    mailhog_email_req = requests.get(f"{MAILHOG_URL}/v2/messages")
    assert mailhog_email_req.status_code == 200, "Mailhog email request failed"

    emails = mailhog_email_req.json()

    reset_email = emails.get("items")[0]

    content = email.message_from_string(reset_email["Raw"]["Data"])
    decoded_email_content = None
    for part in content.walk():
        payload = part.get_payload(decode=True)
        if payload:
            decoded_email_content = payload.decode()

    link = re.findall(
        settings.FRONTEND_URL_BASE+"/reset\?token=.{40}", decoded_email_content
    )[0]
    token = link[-40:]

    assert token, "Token of length 40 not found in the email"

    data = {"token": token, "new_password": "test"}

    reset_response = client.post(
        f"{settings.BACKEND_URL_BASE}{settings.API_V1_STR}/auth/reset-password/",
        headers=headers,
        json=data,
    )

    assert reset_response.status_code == 200


def test_login_with_old_password(client: TestClient):
    data = {
        "username": "test_student@test.local",
        "password": "testold",
        "remember_me": True,
    }

    req = client.post(
        f"{settings.BACKEND_URL_BASE}{settings.API_V1_STR}/auth/web/",
        json=data,
        headers=headers,
    )

    assert req.status_code != 200, "Logged in with old password after reset"
    assert not req.cookies.get("session"), "Cookie returned with old password"


def test_login_with_new_password(client: TestClient):
    data = {
        "username": "test_student@test.local",
        "password": "test",
        "remember_me": True,
    }

    req = client.post(
        f"{settings.BACKEND_URL_BASE}{settings.API_V1_STR}/auth/web/",
        json=data,
        headers=headers,
    )

    assert req.status_code == 200, "Couldn't login with new password"
    assert req.cookies.get("session"), "Cookie not returned with new password"


def test_change_password(client: TestClient):
    wrong_data = {
        "current_password": "testwrong",
        "new_password": "newtest",
    }

    req = client.post(
        f"{settings.BACKEND_URL_BASE}{settings.API_V1_STR}/auth/change-password/",
        json=wrong_data,
        headers=headers,
    )

    assert req.status_code != 200

    data = {
        "current_password": "test",
        "new_password": "newtest",
    }

    req = client.post(
        f"{settings.BACKEND_URL_BASE}{settings.API_V1_STR}/auth/change-password/",
        json=data,
        headers=headers,
    )

    assert req.status_code == 200

    test_web_session_authentication(
        client=client,
        username="test_student@test.local",
        password="newtest",
        remember_me=True,
    )


def test_logout(client: TestClient) -> None:
    response = client.get(
        f"{settings.BACKEND_URL_BASE}{settings.API_V1_STR}/auth/logout/",
        headers=headers,
    )

    assert response.status_code == 200


def test_delete_user(db, super_user_client: TestClient):
    data = {
        "username": "test_superadmin@test.local",
        "password": "test",
        "remember_me": False,
    }

    req = super_user_client.post(
        f"{settings.BACKEND_URL_BASE}{settings.API_V1_STR}/auth/web/",
        json=data,
        headers=headers,
    )

    assert req.status_code == 200, "Superadmin login failed"
    assert req.cookies.get("session"), "Superadmin cookie not returned!"

    user = crud_user.get_by_email(db, email="test_student@test.local")

    delete_req = super_user_client.delete(
        f"{settings.BACKEND_URL_BASE}{settings.API_V1_STR}/users/{user.id}/",
    )

    assert delete_req.status_code == 200
