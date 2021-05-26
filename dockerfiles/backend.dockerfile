FROM python:3.9-alpine

COPY ./dockerfiles/whls /deps/whls
RUN cd deps/whls && pip install *.whl && cd ../..
WORKDIR /app
COPY ./backend .
RUN python manage.py start

