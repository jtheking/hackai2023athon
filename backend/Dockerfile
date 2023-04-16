FROM python:3.11
WORKDIR /code
COPY ./pyproject.toml /code/pyproject.toml
COPY ./poetry.lock /code/poetry.lock
RUN curl -sSL https://install.python-poetry.org | python3 -
COPY ./app /code/app
CMD ["poetry","run","uvicorn", "app:app", "--host", "0.0.0.0", "--port", "80"]