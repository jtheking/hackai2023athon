FROM python:3.11
WORKDIR /code
ENV POETRY_HOME=/etc/poetry
RUN curl -sSL https://install.python-poetry.org | python3 -
COPY ./pyproject.toml /code/pyproject.toml
COPY ./poetry.lock /code/poetry.lock
RUN ["/etc/poetry/bin/poetry","install"]
COPY . /code
CMD ["/etc/poetry/bin/poetry","run","uvicorn", "app:app", "--host", "0.0.0.0", "--port", "80"]
