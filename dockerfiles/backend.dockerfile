FROM python:3.9-alpine

COPY ./dockerfiles/whls /deps/whls
COPY ./backend/pyproject.toml /deps
COPY ./backend/poetry.lock /deps
RUN cd deps/whls && pip install *.whl && cd ../..
RUN pip install poetry
RUN cd /deps && poetry export -f requirements.txt --output requirements.txt && pip install -r requirements.txt
