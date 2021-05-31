FROM python:3.9-alpine
RUN apk add libpq
WORKDIR /deps
COPY ./dockerfiles/whls .
RUN pip install *.whl
RUN rm -rf *
WORKDIR /app
COPY ./dockerfiles/configs/gunicorn.conf.py .
COPY ./backend .
