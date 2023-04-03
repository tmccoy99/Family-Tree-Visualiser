import '../mongodb_test_setup';
import app from '../../src/app';
import testRequest, { Test } from 'supertest';
import User, { IUser } from '../../src/models/user';

describe('UserController testing', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await User.deleteMany({});
  });
  describe('POST /users route', () => {
    test('response to valid email and password has status 201 and message ok', async () => {
      const response = await testRequest(app)
        .post('/users')
        .send({ email: 'hello@testing.com', password: 'testpassword' });
      expect(response.status).toBe(201);
      expect(response.body.message).toBe('OK');
    });

    test('if email and password valid, user will be saved to database', async () => {
      await testRequest(app)
        .post('/users')
        .send({ email: 'hello@testing.com', password: 'testpassword' });
      const savedUser: IUser | null = await User.findOne({
        email: 'hello@testing.com',
      });
      expect(savedUser).not.toBeNull();
    });

    test('if email is a duplicate, sends 409 status and duplicate email message', async () => {
      const user: IUser = new User({
        email: 'hello@testing.com',
        password: 'testpassword',
      });
      await user.save();
      const response = await testRequest(app)
        .post('/users')
        .send({ email: 'hello@testing.com', password: 'otherpassword' });
      expect(response.status).toBe(409);
      expect(response.body.message).toBe('Duplicate email');
    });

    test('other errors return status code 500 and unknown error message', async () => {
      const response = await testRequest(app)
        .post('/users')
        .send({ email: 'hello@testing.com' });
      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Unknown err');
    });
  });
});
