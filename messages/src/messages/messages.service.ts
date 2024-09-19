import { MessagesRepository } from './messages.repository';

export class MessagesService {
  messagesRepository: MessagesRepository;
  constructor() {
    // Don't do this in a real application! Use dependency injection instead.
    // Services should not create instances of other services or repositories.
    this.messagesRepository = new MessagesRepository();
  }

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
