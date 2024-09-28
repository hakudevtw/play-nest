import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

const USER_EMAIL = 'test@test.com';
const USER_PASSWORD = 'test';

// Each test has its own instance of the app
// but sharing the same database
// probably want separate databases for development and testing
// wipe the test database and recreate one before each test

// When running e2e tests, the environment is missing the part in main.ts that sets up the global prefix.
// Ex. sessions, pipes, guards, etc. are not set up.
describe('Authentication System (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles a signup request', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: USER_EMAIL, password: USER_PASSWORD })
      .expect(201)
      .then((res) => {
        const { id, email } = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(USER_EMAIL);
      });
  });

  it('signup as a new user then get the currently logged in user', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: USER_EMAIL, password: USER_PASSWORD })
      .expect(201);

    // Pull out the cookie from the response
    const cookie = res.get('Set-Cookie');

    const { body } = await request(app.getHttpServer())
      .get('/auth/whoami')
      // Send the cookie with the request
      .set('Cookie', cookie)
      .expect(200);

    expect(body.email).toEqual(USER_EMAIL);
  });
});
