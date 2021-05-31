#!/bin/sh

exec gunicorn -k uvicorn.workers.UvicornWorker -c gunicorn.conf.py scripts.launch:app
