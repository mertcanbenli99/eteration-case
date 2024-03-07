## Installation

Copy environment file and install dependencies

```bash
$ cp .env.example .env
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Docker and Docker Compose

A multi-stage dockerfile is provided for both development and production purposes

```bash
# Due to internal nestcli dependencies nest@cli(sh) refuses to work sometimes
# if you are receiving nest not found error you can first locally install dependencies and bind volume

$ npm install
$ docker compose build --no-cache

# Start backend and mongodb service
$ docker compose up

# build image manually
$ docker image build -t eteration-case

$

```

## Swagger

Run the service and hit to https://localhost:3000/api to observe endpoints

## Endpoints
# GET /movie /movies/${id}
 Returns all movies and specified movieById
# POST /movie 
 Creates a movie
# DELETE /movie/${id}
  Deletes a movie with specified id
# GET /movie/fetch TMDB
  Fetches and persists movies from tmdb

