import { Injectable } from '@nestjs/common';
import { MessagesRepository } from './messages.repository';

// Marking the class for registration into the DI container
@Injectable()
export class MessagesService {
  constructor(private messagesRepository: MessagesRepository) {}
  // messagesRepository: MessagesRepository;
  // constructor(messagesRepository: MessagesRepository) {
  //   this.messagesRepository = messagesRepository;
  // }

  findOne(id: string) {
    return this.messagesRepository.findOne(id);
  }

  findAll() {
    return this.messagesRepository.findAll();
  }

  create(content: string) {
    return this.messagesRepository.create(content);
  }
}
