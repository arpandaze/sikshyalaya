FROM python:3.9-alpine
RUN apk add libpq
WORKDIR /deps
COPY ./dockerfiles/whls .
RUN pip install *.whl
WORKDIR /app
COPY ./backend .
