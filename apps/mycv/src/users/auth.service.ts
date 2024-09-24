import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    // See if email is in use
    const users = await this.usersService.find(email);
    console.log('user: ', users);
    if (users.length) {
      throw new BadRequestException('Email in use');
    }

    // Hash the users password with generated salt (usually using bcrypt)
    // randomBytes generates a random string of bytes (1s and 0s)
    // toString('hex') converts the random bytes to a hex string
    // 1 byte -> 2 hex characters
    const salt = randomBytes(8).toString('hex'); // 8 bytes -> 16 hex characters

    // Hash the password with the salt
    // buffer is a type of array in NodeJS that stores binary data
    // used for storing raw data (e.g. images, audio, etc.)
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // Join the salt and hashed password together
    const result = salt + '.' + hash.toString('hex');

    // Create a new user and save it
    const user = await this.usersService.create(email, result);

    // return the user
    return user;
  }

  async signin(email: string, password: string) {
    const [user] = await this.usersService.find(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Bad password');
    }

    return user;
  }
}
