import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastify, { FastifyInstance } from 'fastify';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import awsLambdaFastify, {
  LambdaResponse,
  PromiseHandler,
} from '@fastify/aws-lambda';

const API_PREFIX = process.env.API_PREFIX;
const START_AS_HTTP = process.env.START_AS_HTTP;
const HOST = process.env.HOST;
const PORT = process.env.PORT;

interface NestApp {
  app: NestFastifyApplication;
  instance: FastifyInstance;
}

let cachedNestApp: PromiseHandler<unknown, LambdaResponse>;

// -----------------------------------------
// NOTE: main bootstrap function where all of the configuration is going on
async function bootstrap(): Promise<NestApp> {
  // NOTE: initializing fastify instance with additional options

  const instance: FastifyInstance = fastify();

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(instance),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: '*',
    allowedHeaders: '*',
    exposedHeaders: '*',
    credentials: false,
    methods: ['GET', 'PUT', 'OPTIONS', 'POST', 'DELETE'],
  });

  // Set the prefix as necessary
  app.setGlobalPrefix(API_PREFIX ?? 'api/v1');

  await app.init();

  return {
    app,
    instance,
  };
}
// -----------------------------------------

// -----------------------------------------
// NOTE: if you want to NOT use 'sls offline' and instead spin-up backend as a regular service,
// this section is responsible for that.
// All is needed is setting START_AS_HTTP to 'true' value.
const startAsHTTP = async function () {
  const nestApp: NestApp = await bootstrap();
  await nestApp.app.listen(PORT ?? 8080, HOST ?? '0.0.0.0');
  console.log(`Listening at ${HOST} on port ${PORT}`);
};

if (START_AS_HTTP === 'true') {
  startAsHTTP().catch((err) => {
    console.log('Failed running locally:', err);
  });
}
// -----------------------------------------

// -----------------------------------------
// NOTE: AWS-lambda handler that will be called
export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
) => {
  // If there's no cached app
  if (!cachedNestApp) {
    // Bootstrap
    const nestApp: NestApp = await bootstrap();

    // Create an AWS Lambda Fastify cached app from the Nest app
    cachedNestApp = awsLambdaFastify(nestApp.instance, {
      decorateRequest: true,
    });
  }

  return cachedNestApp(event, context);
};
// -----------------------------------------
