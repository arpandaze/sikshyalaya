import os
import sys
from time import sleep
import click

# RCOUNT: 145


class CommandDefinition:
    def generator(self, name, det):  # noqa
        from utils import generator

        if det == "all":
            if not name:
                print("Enter at least one name!")
            for item in name:
                generator.create_model(item)
                generator.create_endpoint(item)
                generator.create_crud(item)
                generator.create_schema(item)

        elif det == "model":
            if not name:
                print("Enter at least one model name!")
            for item in name:
                generator.create_model(item)

        elif det == "schema":
            if not name:
                print("Enter at least one schema name!")
            for item in name:
                generator.create_schema(item)

        elif det == "endpoint":
            if not name:
                print("Enter at least one endpoint name!")
            for item in name:
                generator.create_endpoint(item)

        elif det == "crud":
            if not name:
                print("Enter at least one CRUD name!")
            for item in name:
                generator.create_crud(item)

    def start(self):
        from misc.scripts import launch

        launch.run()

    def mkmig(self):
        from alembic import command
        from alembic.config import Config

        alembic_cfg = Config("alembic.ini")

        msg = input("Enter a message: ")
        command.revision(config=alembic_cfg, autogenerate=True, message=msg)
        click.echo("Inside migrate")

    def mig(self):
        from alembic import command
        from alembic.config import Config

        alembic_cfg = Config("alembic.ini")
        command.upgrade(alembic_cfg, "head")

    def cleanmig(self):
        for file in os.listdir("migrations/versions/"):
            if file != ".keep":
                if os.path.isfile(f"migrations/versions/{file}"):
                    os.remove(f"migrations/versions/{file}")

    def cleanredis(self):
        from core.config import settings

        os.system(
            f"docker-compose exec redis redis-cli -a {settings.SECRET_KEY} FLUSHALL"
        )

    def logs(self):
        os.system(f"docker-compose logs -f -t")

    def remake(self):
        self.cleandb()
        self.populate()

    def remakeall(self):
        from alembic import command
        from alembic.config import Config

        try:
            os.system(f"docker-compose down -v -t 5")
            os.system(
                f"cd .. && docker-compose up -d postgres redis pgadmin mailhog file_server"
            )
        except Exception as e:
            print(e)

        self.cleanmig()

        alembic_cfg = Config("alembic.ini")

        rev_created = False

        while True:
            try:
                if not rev_created:
                    command.revision(
                        config=alembic_cfg, autogenerate=True, message="Remake All"
                    )
                    rev_created = True

                command.upgrade(alembic_cfg, "head")
                break
            except Exception as e:
                print(e)
                print("Waiting for containers to boot!")
                sleep(3)

        try:
            self.populate()
        except Exception as e:
            print(e)

    def dcstart(self):
        os.system(
            "cd .. && docker-compose up -d postgres file_server redis pgadmin mailhog"
        )

    def cleandb(self):
        try:
            from alembic import command
            from alembic.config import Config

            from core.db import engine

            self.cleanmig()
            engine.execute("DROP schema public CASCADE")
            engine.execute("CREATE schema public")
            alembic_cfg = Config("alembic.ini")
            command.revision(config=alembic_cfg, autogenerate=True, message="cleandb")
            command.upgrade(alembic_cfg, "head")
        except Exception as e:
            print(e)

    def populate(self):
        from utils import populate as db_populate

        sleep(5)
        db_populate.populate_all()

    def pytest(self):
        ec = int(
            os.system(
                "pytest --verbose --color=yes tests/api/api_v1/")
            / 256
        )
        sys.exit(ec)

    def build_push(self):
        ec = int(
            os.system(
                "docker build -t registry.gitlab.com/arpandaze/sikshyalaya/backend . && docker push registry.gitlab.com/arpandaze/sikshyalaya/backend")
            / 256
        )
        sys.exit(ec)


commands = CommandDefinition()


@click.group()
def main():
    pass


@click.group("create")
@click.pass_context
def create(context):
    if not context.invoked_subcommand:
        pass


@click.group("clean")
@click.pass_context
def clean(context):
    if not context.invoked_subcommand:
        pass


@click.command()
@click.argument("name", nargs=-1)
def all(name):  # noqa
    commands.generator(name, "all")


@click.command()
@click.argument("name", nargs=-1)
def model(name):
    commands.generator(name, "model")


@click.command()
@click.argument("name", nargs=-1)
def schema(name):
    commands.generator(name, "schema")


@click.command()
@click.argument("name", nargs=-1)
def endpoint(name):
    commands.generator(name, "endpoint")


@click.command()
@click.argument("name", nargs=-1)
def crud(name):
    commands.generator(name, "crud")


@click.command()
def start():
    commands.start()


@click.command()
def dcstart():
    commands.dcstart()


@click.command()
def pytest():
    commands.pytest()

@click.command()
def build_push():
    commands.build_push()


@click.command()
def mkmig():
    commands.mkmig()


@click.command()
def mig():
    commands.mig()


@click.command(name="mig")
def clean_mig():
    commands.cleanmig()


@click.command()
def redis():
    commands.cleanredis()


@click.command()
def logs():
    commands.logs()


@click.command()
def remakeall():
    commands.remakeall()


@click.command()
def remake():
    commands.remake()


@click.command()
def db():
    commands.cleandb()


@click.command()
def populate():
    commands.populate()


main.add_command(create)
main.add_command(clean)
main.add_command(start)
main.add_command(mkmig)
main.add_command(mig)
main.add_command(populate)
main.add_command(logs)
main.add_command(remakeall)
main.add_command(remake)
main.add_command(dcstart)
main.add_command(pytest)
main.add_command(build_push)
clean.add_command(db)
clean.add_command(clean_mig)
clean.add_command(redis)
create.add_command(model)
create.add_command(schema)
create.add_command(crud)
create.add_command(endpoint)
create.add_command(all)

if __name__ == "__main__":
    main()
