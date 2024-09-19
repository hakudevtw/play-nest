import { Controller, Get, Post, Param, Body } from '@nestjs/common';

// messages/* is the root path for all routes in this controller
@Controller('messages')
export class MessagesController {
  @Get()
  getMessages() {
    return 'All messages';
  }

  @Get(':id')
  getMessage(@Param('id') id: string) {
    console.log(id);
    return `Message with id ${id}`;
  }

  @Post()
  createMessage(@Body() body: any) {
    return `Message added with content: ${body.content}`;
  }
}
