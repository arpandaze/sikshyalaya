import click
import os
import uvicorn
from alembic import command
from alembic.config import Config
from dotenv import load_dotenv
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

if __name__ == '__main__':
    load_dotenv("../.env")

from core.db import engine
from utils import populate
from utils import generator
from api import router
from core.config import settings

app = FastAPI(
    title=settings.PROJECT_NAME, openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        # allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    pass

app.include_router(router, prefix=settings.API_V1_STR)


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
    if not name:
        print("Enter at least one model name!")
    for item in name:
        generator.create_model(item)
        generator.create_endpoint(item)
        generator.create_crud(item)
        generator.create_schema(item)


@click.command()
@click.argument("name", nargs=-1)
def model(name):
    if not name:
        print("Enter at least one model name!")
    for item in name:
        generator.create_model(item)


@click.command()
@click.argument("name", nargs=-1)
def schema(name):
    if not name:
        print("Enter at least one schema name!")
    for item in name:
        generator.create_schema(item)


@click.command()
@click.argument("name", nargs=-1)
def endpoint(name):
    if not name:
        print("Enter at least one endpoint name!")
    for item in name:
        generator.create_endpoint(item)


@click.command()
@click.argument("name", nargs=-1)
def crud(name):
    if not name:
        print("Enter at least one CRUD name!")
    for item in name:
        generator.create_crud(item)


@click.command()
def start():
    uvicorn.run(
        "manage:app",
        host="127.0.0.1",
        port=int("8080"),
        reload=True,
        debug=True,
        workers=4,
    )


@click.command()
def mkmig():
    alembic_cfg = Config("alembic.ini")
    msg = input("Enter a message: ")
    command.revision(config=alembic_cfg, autogenerate=True, message=msg)
    click.echo("Inside migrate")


@click.command()
def mig():
    alembic_cfg = Config("alembic.ini")
    command.upgrade(alembic_cfg, "head")


@click.command()
def cleanmg():
    for file in os.listdir("migrations/versions/"):
        if os.path.isfile(f"migrations/versions/{file}"):
            os.remove(f"migrations/versions/{file}")


@click.command()
def cleandb():
    engine.execute("DROP schema public CASCADE")
    engine.execute("CREATE schema public")


@click.command()
def populate():
    populate.populate_all()


main.add_command(create)
main.add_command(start)
main.add_command(mkmig)
main.add_command(mig)
main.add_command(populate)
main.add_command(cleandb)
main.add_command(cleanmg)
create.add_command(model)
create.add_command(schema)
create.add_command(crud)
create.add_command(endpoint)
create.add_command(all)

if __name__ == "__main__":
    main()
