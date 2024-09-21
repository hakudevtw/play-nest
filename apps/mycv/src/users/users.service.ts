import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './user.entity';

@Injectable()
export class UsersService {
  // DI don't deal with generic types
  // Need to use @InjectRepository to inject the repository
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    // Create a new user entity (with validation)
    const user = this.repo.create({ email, password });
    // Save the user entity to the database
    return this.repo.save(user);

    // Alternative (Dangerous)
    // Will not run hooks in the entity
    // Also lose the ability to validate the entity
    // return this.repo.save({ email, password });
  }
}
