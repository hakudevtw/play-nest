import { Module, ValidationPipe, MiddlewareConsumer } from '@nestjs/common';
import cookieSession from 'cookie-session';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite', // file-based database
      database: 'db.sqlite', // name of the database file
      entities: [User, Report], // entities to load
      synchronize: true, // auto-update the db tables (for development only)
      // Usually, migrations are written by developers to update the database schema
    }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      // Runs this pipe for every incoming request
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {
  // Will be called by Nest when the app is ready
  configure(consumer: MiddlewareConsumer) {
    // Setup middleware for the app
    // Apply the middleware to all routes
    consumer
      .apply(
        cookieSession({
          keys: ['asdklkjljs'],
        }),
      )

      .forRoutes('*');
  }
}
