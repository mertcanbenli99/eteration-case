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
# Start backend and mongodb service
$ docker compose up

# build image manually
$ docker image build -t eteration-case




