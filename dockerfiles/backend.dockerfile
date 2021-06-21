FROM python:3.9-alpine

RUN apk add libpq

WORKDIR /deps
COPY ./misc/build_cache/whls .
RUN pip install *.whl
RUN rm -rf *

WORKDIR /app
COPY ./ .
RUN mv ./misc/etc/gunicorn.conf.py .
RUN rm -rf ./misc/build_cache
