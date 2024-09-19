import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dtos/create-message.dto';

// messages/* is the root path for all routes in this controller
@Controller('messages')
export class MessagesController {
  messagesService: MessagesService;
  constructor() {
    // Don't do this in a real application! Use dependency injection instead.
    // Services should not create instances of other services or repositories.
    this.messagesService = new MessagesService();
  }

  @Get()
  getMessages() {
    return this.messagesService.findAll();
  }

  @Get(':id')
  getMessage(@Param('id') id: string) {
    return this.messagesService.findOne(id);
  }

  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    return this.messagesService.create(body.content);
  }
}
