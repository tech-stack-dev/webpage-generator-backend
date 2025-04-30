# TSWEB-GENERATOR

Backend service of the TSWebPageGenerator, responsible for API calls to OpenAI
and incoming-prompts pre-processing.
Utilizes the Nest.js framework https://nestjs.com/.

## Prerequisites

- Make sure that Node.js and Yarn are installed
  - https://nodejs.org/en/download/
  - https://pnpm.io/installation#using-corepack
- Node version >= 20.x (locally latest LTS 22.15.0 was observed to work without any hiccups)

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
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev
```

## Building and running in production environment:

```bash
# build
$ pnpm run build

# run in production mode
$ pnpm run start:prod
```

## Testing

```bash
# unit tests
$ pnpm run test
```
