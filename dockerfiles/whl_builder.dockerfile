FROM python:3.9-alpine
WORKDIR /app/deps
COPY ./pyproject.toml .
COPY ./poetry.lock .
RUN apk add gcc musl-dev python3-dev libffi-dev openssl-dev cargo g++ libxslt-dev postgresql-dev build-base
RUN pip install poetry
RUN poetry export --without-hashes -f requirements.txt --output requirements.txt
RUN pip wheel -r requirements.txt -w /whls
