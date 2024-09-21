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

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  find(email: string) {
    return this.repo.find({ where: { email } });
  }

  async update(id: number, attrs: Partial<User>) {
    // insert and update will not run hooks in the entity
    // return this.repo.update(id, attrs);

    // Fetch the user entity first (not so efficient)
    const user = await this.findOne(id);
    if (!user) throw new Error('User not found');
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    // delete will not run hooks in the entity
    // return this.repo.delete(id);

    const user = await this.findOne(id); // User entity
    if (!user) throw new Error('User not found');
    return this.repo.remove(user);
  }
}
