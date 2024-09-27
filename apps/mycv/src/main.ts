import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Moved to AppModule to be used globally
  // app.use(
  //   cookieSession({
  //     keys: ['asdklkjljs'],
  //   }),
  // );
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     // Strips away any unknown incoming properties
  //     whitelist: true,
  //   }),
  // );
  await app.listen(3000);
}
bootstrap();
