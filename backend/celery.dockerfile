FROM python:3.9

WORKDIR /app/

RUN curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | POETRY_HOME=/opt/poetry python && \
    cd /usr/local/bin && \
    ln -s /opt/poetry/bin/poetry && \
    poetry config virtualenvs.create false

COPY ./app/pyproject.toml ./app/poetry.lock /app/

RUN bash -c "poetry install --no-dev --no-root"

COPY ./app /app

ENV PYTHONPATH=/app

ENV C_FORCE_ROOT=1

RUN celery -A worker app.worker -l info -Q main -c 1