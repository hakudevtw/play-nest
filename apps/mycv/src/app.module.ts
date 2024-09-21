import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportsController } from './reports/reports.controller';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { ReportsService } from './reports/reports.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [TypeOrmModule, UsersModule, ReportsModule],
  controllers: [AppController, ReportsController, UsersController],
  providers: [AppService, UsersService, ReportsService],
})
export class AppModule {}
