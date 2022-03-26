FROM python:3.9-alpine AS builder

WORKDIR /app/deps

COPY ./pyproject.toml .
COPY ./poetry.lock .

RUN apk add gcc musl-dev python3-dev libffi-dev openssl-dev cargo g++ libxslt-dev postgresql-dev build-base

RUN pip install poetry
RUN poetry export --without-hashes -f requirements.txt --output requirements.txt
RUN pip wheel -r requirements.txt -w /whls

FROM python:3.9-alpine
RUN apk add libpq

WORKDIR /deps
COPY --from=builder /whls /deps
RUN pip install *.whl
RUN rm -rf *

WORKDIR /app
COPY ./ .
RUN mv ./misc/etc/gunicorn.conf.py .

EXPOSE 80

CMD ["./misc/scripts/docker-entrypoint.sh"]
