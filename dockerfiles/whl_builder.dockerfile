FROM python:3.9-alpine
COPY ./pyproject.toml /deps
COPY ./poetry.lock /deps
RUN apk add gcc musl-dev python3-dev libffi-dev openssl-dev cargo g++ libxslt-dev postgresql-dev build-base
RUN pip install poetry
RUN cd deps && poetry export --without-hashes -f requirements.txt --output requirements.txt
RUN cd deps && pip wheel -r requirements.txt -w /whls
