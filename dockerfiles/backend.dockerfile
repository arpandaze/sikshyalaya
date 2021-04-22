FROM python:3.9-alpine

WORKDIR /backend

RUN apk --no-cache add curl

COPY . /backend

RUN curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | POETRY_HOME=/opt/poetry python -

RUN apk add --update --no-cache g++ gcc libxslt-dev libffi-dev

RUN cd /usr/local/bin && \
    ln -s /opt/poetry/bin/poetry && \
    poetry config virtualenvs.create false

RUN poetry install --no-dev --no-root

ENV PYTHONPATH=/app
EXPOSE 80

RUN python manage.py start
