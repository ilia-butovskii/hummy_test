import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/AppModule';
import { HttpStatus, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      errorHttpStatusCode: HttpStatus.BAD_REQUEST,
    })
  );

  await app.listen(8080);
}

bootstrap();
