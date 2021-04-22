import os
import re

from mako.template import Template


def pascal_case_to_snake(name):
    name = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', name)
    return re.sub('([a-z0-9])([A-Z])', r'\1_\2', name).lower()


def create_endpoint(name: str):
    mytemp = Template(filename="templates/endpoint.pyt")
    snake_case_name = pascal_case_to_snake(name)
    pascal_case_name = name
    rendered = mytemp.render(snake_case_name=snake_case_name, PascalCaseName=pascal_case_name)
    file = f"api/endpoints/{snake_case_name}.py"

    if os.path.isfile(file):
        raise Exception("File already exists")

    with open(file, "w") as f:
        f.write(rendered)


def create_schema(name: str):
    mytemp = Template(filename="templates/schema.pyt")
    snake_case_name = pascal_case_to_snake(name)
    pascal_case_name = name
    rendered = mytemp.render(snake_case_name=snake_case_name, PascalCaseName=pascal_case_name)
    file = f"schemas/{snake_case_name}.py"

    if os.path.isfile(file):
        raise Exception("File already exists")

    with open(file, "w") as f:
        f.write(rendered)
    with open("schemas/__init__.py", "a") as f:
        f.write("\n")
        import_temp = Template(
            "from .${snake_case_name} import ${PascalCaseName}, ${PascalCaseName}Create, ${PascalCaseName}Update, ${PascalCaseName}InDB")
        f.write(import_temp.render(snake_case_name=snake_case_name, PascalCaseName=pascal_case_name))


def create_model(name: str):
    mytemp = Template(filename="templates/model.pyt")
    snake_case_name = pascal_case_to_snake(name)
    pascal_case_name = name
    rendered = mytemp.render(snake_case_name=snake_case_name, PascalCaseName=pascal_case_name)
    file = f"models/{snake_case_name}.py"

    if os.path.isfile(file):
        raise Exception("File already exists")

    with open(file, "w") as f:
        f.write(rendered)

    with open("models/__init__.py", "a") as f:
        f.write("\n")
        import_temp = Template(
            "from .${snake_case_name} import ${PascalCaseName}")
        f.write(import_temp.render(snake_case_name=snake_case_name, PascalCaseName=pascal_case_name))


def create_crud(name: str):
    mytemp = Template(filename="templates/crud.pyt")
    snake_case_name = pascal_case_to_snake(name)
    pascal_case_name = name
    rendered = mytemp.render(snake_case_name=snake_case_name, PascalCaseName=pascal_case_name)
    file = f"cruds/{snake_case_name}.py"

    if os.path.isfile(file):
        raise Exception("File already exists")

    with open(file, "w") as f:
        f.write(rendered)

    with open("cruds/__init__.py", "a") as f:
        f.write("\n")
        import_temp = Template(
            "from .${snake_case_name} import crud_${snake_case_name}")
        f.write(import_temp.render(snake_case_name=snake_case_name))


if __name__ == '__main__':
    print(create_endpoint(name="Department"))
