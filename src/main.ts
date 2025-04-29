import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

const HOST = process.env.HOST;
const PORT = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.enableCors();

  await app.listen(PORT ?? 3000, HOST ?? '0.0.0.0');
}

bootstrap()
  .then(() => {
    console.log(`App listens at ${HOST}:${PORT}`);
  })
  .catch((err) => {
    console.log('Error during application bootstrap', err);
  });
