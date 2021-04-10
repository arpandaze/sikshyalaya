#! /usr/bin/env bash

python /app/app/backend_pre_start.py

# Run migrations
alembic upgrade head
alembic revision --autogenerate
alembic upgrade head

python /app/app/initial_data.py
