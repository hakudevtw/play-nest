import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';

const USER_EMAIL = 'test@test.com';
const USER_PASSWORD = 'test';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  // Runs before each test
  beforeEach(async () => {
    const users: User[] = [];

    // Create a fake copy of the UsersService
    // By changing the implementation of the fakeUsersService
    // we can test different scenarios
    fakeUsersService = {
      // Only mocking the methods needed by AuthService
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 9999),
          email,
          password,
        } as User;

        users.push(user);
        return Promise.resolve(user);
      },
    };

    // Creating a mock di container
    // list of classes and their dependencies
    // able to create instances of classes and inject their dependencies
    const module = await Test.createTestingModule({
      providers: [
        // depends on UsersService
        AuthService,
        // use fakUserService if UsersService is requested
        // provide = asked for, useValue = give this instead
        { provide: UsersService, useValue: fakeUsersService },
      ],
    }).compile();

    // Getting the service from the container
    // Create an instance of the AuthService
    // Container will inject all the dependencies of the service
    service = module.get(AuthService);
    // 1. Create an instance of the AuthService
    // 2. Found that it depends on UsersService
    // 3. Try creating an instance of the UsersService
    // 4. Found the rule to use fakeUsersService object instead
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with a salted and hashed password', async () => {
    const user = await service.signup(USER_EMAIL, USER_PASSWORD);
    const [salt, hash] = user.password.split('.');

    expect(user.password).not.toEqual(USER_PASSWORD);
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws and error if user signs up with email that is in use', async () => {
    await service.signup(USER_EMAIL, USER_PASSWORD);
    await expect(service.signup(USER_EMAIL, USER_PASSWORD)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('throws and error if signin is called with an unused email', async () => {
    await expect(service.signin(USER_EMAIL, USER_PASSWORD)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('throws and error if an invalid password is provided', async () => {
    await service.signup(USER_EMAIL, USER_PASSWORD);
    await expect(service.signin(USER_EMAIL, 'wrong_password')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('returns a user if correct password is provided', async () => {
    await service.signup(USER_EMAIL, USER_PASSWORD);
    const user = await service.signin(USER_EMAIL, USER_PASSWORD);
    expect(user).toBeDefined();
  });
});
