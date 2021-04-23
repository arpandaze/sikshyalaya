FROM python:3.9

WORKDIR /backend

COPY . /backend

RUN curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | POETRY_HOME=/opt/poetry python -

RUN cd /usr/local/bin && \
    ln -s /opt/poetry/bin/poetry && \
    poetry config virtualenvs.create false

RUN poetry install --no-dev --no-root

ENV PYTHONPATH=/app
EXPOSE 80

RUN python manage.py start
