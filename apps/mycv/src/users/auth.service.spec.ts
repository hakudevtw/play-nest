import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';

describe('AuthService', () => {
  let service: AuthService;

  // Runs before each test
  beforeEach(async () => {
    // Create a fake copy of the UsersService
    // By changing the implementation of the fakeUsersService
    // we can test different scenarios
    const fakeUsersService: Partial<UsersService> = {
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
});
