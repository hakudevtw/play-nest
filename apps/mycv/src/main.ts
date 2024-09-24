import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import cookieSession from 'cookie-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cookieSession({
      keys: ['asdklkjljs'],
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      // Strips away any unknown incoming properties
      whitelist: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
