import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { MessagesRepository } from './messages.repository';

@Module({
  controllers: [MessagesController],
  // Providers are classes that can be injected into other classes
  // Scoped under the MessagesModule
  providers: [MessagesService, MessagesRepository],
})
export class MessagesModule {}
