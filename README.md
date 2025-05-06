# TSWEB-GENERATOR

Backend service of the TSWebPageGenerator, responsible for API calls to OpenAI
and incoming-prompts pre-processing.
Utilizes the Nest.js framework https://nestjs.com/ with FASTIFY-adapter.

Deployed on AWS-lambda.

## Prerequisites

- Make sure that Node.js and PNPM are installed
  - https://nodejs.org/en/download/
  - https://pnpm.io/installation#using-corepack
- Node version >= 20.x (locally, both through HTTP & Serverless-offline, latest LTS 22.15.0 was observed to work without any hiccups)

### If you want to develop locally using not ordinary HTTP-server, but through serverless-offline:

- Make sure that you have Serverless installed globally and you have signed-up to an account:
  - https://www.serverless.com/framework/docs/getting-started

## Dependencies installation

```bash
$ pnpm install
```

## Preparation

- Check .env.local file, which contains placeholders for the actual environment values needed for running an app
  and connection to all related services. After obtaining the needed values for environment variables,
  create a new .env (.gitignored to not accidentally leak keys) file & paste the placeholders with corresponding
  values into it.

## Run the project locally

```bash
# development mode http
$ pnpm run start

# watch mode as an ordinary local http-server
# do NOT FORGET to set START_AS_HTTP to true
$ pnpm run start:dev:http

# watch mode through local lambda setup by serverless-offline
$ pnpm run start:dev:lambda
```

## Building and running in production environment:

```bash
# build
$ pnpm run build

# run in production mode (http-only, as lambda will be called by AWS itself)
$ pnpm run start:prod
```

## Testing

```bash
# unit tests
$ pnpm run test
```
