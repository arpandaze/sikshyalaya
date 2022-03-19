from core import settings

workers = settings.WORKERS
bind = f"{settings.BACKEND_HOST}:{settings.BACKEND_PORT}"
worker_tmp_dir = "/dev/shm"
graceful_timeout = 15
timeout = 30
