import { Controller, Get, Post } from '@nestjs/common';

// messages/* is the root path for all routes in this controller
@Controller('messages')
export class MessagesController {
  @Get()
  getMessages() {
    return 'All messages';
  }

  @Get(':id')
  getMessage() {
    return 'One message';
  }

  @Post()
  createMessage() {
    return 'Message added';
  }
}
