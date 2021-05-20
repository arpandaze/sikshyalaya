import os
from time import sleep

# RCOUNT: 145

import click
from alembic import command
from alembic.config import Config
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware

if __name__ == "__main__":
    load_dotenv("../.env")

from core.db import engine
from utils import populate as db_populate
from utils import generator
from api import router
from core.config import settings
from core.db import init


class CommandDefinition:
    def all(name):  # noqa
        if not name:
            print("Enter at least one name!")
        for item in name:
            generator.create_model(item)
            generator.create_endpoint(item)
            generator.create_crud(item)
            generator.create_schema(item)

    def model(name):
        if not name:
            print("Enter at least one model name!")
        for item in name:
            generator.create_model(item)

    def schema(name):
        if not name:
            print("Enter at least one schema name!")
        for item in name:
            generator.create_schema(item)

    def endpoint(name):
        if not name:
            print("Enter at least one endpoint name!")
        for item in name:
            generator.create_endpoint(item)

    def crud(name):
        if not name:
            print("Enter at least one CRUD name!")
        for item in name:
            generator.create_crud(item)

    def start():
        import uvicorn
        from fastapi import FastAPI
        from core.db import (
            redis_cache_client,
            redis_blacklist_client,
            redis_throttle_client,
            redis_session_client,
            redis_general,
        )

        app = FastAPI(
            title=settings.PROJECT_NAME,
            openapi_url=f"{settings.API_V1_STR}/openapi.json",
        )

        @app.on_event("startup")
        async def startup():
            await redis_cache_client.initialize()
            await redis_blacklist_client.initialize()
            await redis_throttle_client.initialize()
            await redis_session_client.initialize()
            await redis_general.initialize()
            init.init_db()

        @app.on_event("shutdown")
        async def shutdown():
            await redis_cache_client.close()
            await redis_blacklist_client.close()
            await redis_throttle_client.close()
            await redis_session_client.close()
            await redis_general.close()

        if settings.BACKEND_CORS_ORIGINS:
            app.add_middleware(
                CORSMiddleware,
                allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
                allow_credentials=True,
                allow_methods=["*"],
                allow_headers=["*"],
            )
            pass

        app.include_router(router, prefix=settings.API_V1_STR)

        uvicorn.run(
            "manage:app",
            host=settings.UVICORN_HOST,
            port=settings.UVICORN_PORT,
            reload=True if settings.DEV_MODE else False,
            debug=True if settings.DEV_MODE else False,
            workers=settings.UVICORN_WORKERS,
        )

    def mkmig():
        alembic_cfg = Config("alembic.ini")
        msg = input("Enter a message: ")
        command.revision(config=alembic_cfg, autogenerate=True, message=msg)
        click.echo("Inside migrate")

    def mig():
        alembic_cfg = Config("alembic.ini")
        command.upgrade(alembic_cfg, "head")

    def cleanmig():
        for file in os.listdir("migrations/versions/"):
            if os.path.isfile(f"migrations/versions/{file}"):
                os.remove(f"migrations/versions/{file}")

    def cleanredis():
        os.system(
            f"docker-compose exec redis redis-cli -a {settings.SECRET_KEY} FLUSHALL"
        )

    def logs():
        os.system(f"docker-compose logs -f -t")

    def remake():
        try:
            os.system(f"docker-compose down -v -t 5")
            os.system(f"cd .. && docker-compose up -d postgres redis pgadmin mailhog")
        except Exception as e:
            print(e)

        for file in os.listdir("migrations/versions/"):
            if os.path.isfile(f"migrations/versions/{file}"):
                os.remove(f"migrations/versions/{file}")

        alembic_cfg = Config("alembic.ini")

        rev_created = False

        while True:
            try:
                if not rev_created:
                    command.revision(
                        config=alembic_cfg, autogenerate=True, message="Remake"
                    )
                    rev_created = True

                command.upgrade(alembic_cfg, "head")
                break
            except:
                print("Waiting for containers to boot!")
                sleep(3)

        try:
            db_populate.populate_all()
        except Exception as e:
            print(e)

    def cleandb():
        try:
            engine.execute("DROP schema public CASCADE")
            engine.execute("CREATE schema public")
            alembic_cfg = Config("alembic.ini")
            command.upgrade(alembic_cfg, "head")
        except Exception as e:
            print(e)

    def populate():
        db_populate.populate_all()


commands = CommandDefinition()


@click.group()
def main():
    pass


@click.group("create")
@click.pass_context
def create(context):
    if not context.invoked_subcommand:
        print("Only create")


@click.command()
@click.argument("name", nargs=-1)
def all(name):  # noqa
    commands.all(name)


@click.command()
@click.argument("name", nargs=-1)
def model(name):
    commands.model(name)


@click.command()
@click.argument("name", nargs=-1)
def schema(name):
    commands.schema(name)


@click.command()
@click.argument("name", nargs=-1)
def endpoint(name):
    commands.endpoint(name)


@click.command()
@click.argument("name", nargs=-1)
def crud(name):
    commands.crud(name)


@click.command()
def start():
    commands.start()


@click.command()
def mkmig():
    commands.mkmig()


@click.command()
def mig():
    commands.mig()


@click.command()
def cleanmig():
    commands.cleanmig()


@click.command()
def cleanredis():
    commands.cleanredis()


@click.command()
def logs():
    commands.logs()


@click.command()
def remake():
    commands.remake()


@click.command()
def cleandb():
    commands.cleandb()


@click.command()
def populate():
    commands.populate()


main.add_command(create)
main.add_command(start)
main.add_command(mkmig)
main.add_command(mig)
main.add_command(populate)
main.add_command(cleandb)
main.add_command(cleanmig)
main.add_command(cleanredis)
main.add_command(logs)
main.add_command(remake)
create.add_command(model)
create.add_command(schema)
create.add_command(crud)
create.add_command(endpoint)
create.add_command(all)

if __name__ == "__main__":
    main()
