import { BadRequestException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  // Runs before each test
  beforeEach(async () => {
    // Create a fake copy of the UsersService
    // By changing the implementation of the fakeUsersService
    // we can test different scenarios
    fakeUsersService = {
      // Only mocking the methods needed by AuthService
      find: () => Promise.resolve([]),
      create: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as User),
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
    const EMAIL = 'test@test.com';
    const PASSWORD = 'test';
    const user = await service.signup(EMAIL, PASSWORD);
    const [salt, hash] = user.password.split('.');

    expect(user.password).not.toEqual(PASSWORD);
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws and error if user signs up with email that is in use', async () => {
    fakeUsersService.find = () =>
      Promise.resolve([
        {
          id: 1,
          email: 'test@test.com',
          password: 'test',
        } as User,
      ]);
    await expect(service.signup('test@test.com', 'test')).rejects.toThrow(
      BadRequestException,
    );
  });
});
