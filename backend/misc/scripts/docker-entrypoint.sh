#!/bin/sh
exec gunicorn -k uvicorn.workers.UvicornWorker -c gunicorn.conf.py misc.scripts.launch:app
