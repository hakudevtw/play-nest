import { ValidationPipe, INestApplication } from '@nestjs/common';
import cookieSession from 'cookie-session';

// Nest recommends to move cookie-session and validation pipe setup to app.module.ts, able to run in both main.ts and e2e tests

// Not restricted to use the nest recommended way
// Might be a good idea to use this to share setup code between the main.ts and the e2e tests
export const setupApp = (app: INestApplication) => {
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
};
