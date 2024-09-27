import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';

const USER_ID = 1;
const USER_EMAIL = 'test@test.com';
const USER_PASSWORD = 'test';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
      findOne: (id: number) =>
        Promise.resolve({
          id,
          email: USER_EMAIL,
          password: USER_PASSWORD,
        } as User),
      find: (email: string) =>
        Promise.resolve([
          {
            id: USER_ID,
            email,
            password: USER_PASSWORD,
          },
        ] as User[]),
      // remove: () => {},
      // update: () => {},
    };

    fakeAuthService = {
      // signup: () => {},
      signin: (email: string, password: string) =>
        Promise.resolve({ id: USER_ID, email, password } as User),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('finds all users with a given email', async () => {
    const users = await controller.findAllUsers(USER_EMAIL);
    expect(users).toHaveLength(1);
    expect(users[0].email).toEqual(USER_EMAIL);
  });

  it('finds a user by id', async () => {
    const user = await controller.findUser(String(USER_ID));
    expect(user.id).toEqual(USER_ID);
  });

  it('returns null when user is not found', async () => {
    fakeUsersService.findOne = () => null;
    await expect(controller.findUser(String(USER_ID))).rejects.toThrow(
      NotFoundException,
    );
  });

  it('signin a user', async () => {
    const session = { userId: -10 };

    const user = await controller.signin(
      { email: USER_EMAIL, password: USER_PASSWORD },
      session,
    );

    expect(user.id).toEqual(USER_ID);
    expect(session.userId).toEqual(USER_ID);
  });
});
