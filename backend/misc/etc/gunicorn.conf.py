import os

workers = os.environ.get("GUNICORN_WORKERS", 9)
bind = "0.0.0.0:80"
worker_tmp_dir = "/dev/shm"
graceful_timeout = int(os.environ.get("UVICORN_GRACEFUL_TIMEOUT",15))
timeout = int(os.environ.get("UVICORN_TIMEOUT",30))
