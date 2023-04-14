import { Payload, generateToken } from '../../src/controllers/TokenController';
import JWT from 'jsonwebtoken';
import testRequest from 'supertest';
import '../mongodb_test_setup';
import app from '../../src/app';
import User, { IUser } from '../../src/models/user';

describe('TokenController testing', () => {
  let testUserID: string;
  beforeAll(async () => {
    const user: IUser = new User({
      email: 'user@example.com',
      password: 'testpassword',
    });
    await user.save();
    testUserID = user.id;
  });

  afterAll(async () => {
    await User.deleteMany({});
  });

  describe('generate method testing', () => {
    test('it returns a token as a string', () => {
      const token = generateToken('user123');
      expect(typeof token).toBe('string');
      expect(token.length).toBeGreaterThan(0);
    });

    test('the payload of the string can be decoded, contains userID and has 10 minutes of duration', () => {
      const token = generateToken('user123');
      const payload = JWT.decode(token) as Payload;
      expect(payload.userID).toBe('user123');
      expect(payload.exp - payload.iat).toBe(600);
    });
  });

  describe('POST /tokens route testing', () => {
    test('invalid email results in response with status 401 and auth error', async () => {
      const response = await testRequest(app)
        .post('/tokens')
        .send({ email: 'test123@fake.com', password: 'testpassword' });
      expect(response.status).toBe(401);
      expect(response.body).toEqual({ message: 'auth error' });
    });

    test('invalid password results in response with status 401 and auth error', async () => {
      const response = await testRequest(app)
        .post('/tokens')
        .send({ email: 'user@example.com', password: 'testpassword1' });
      expect(response.status).toBe(401);
      expect(response.body).toEqual({ message: 'auth error' });
    });

    test('valid email and password sends 201 status, body with token, userID and ok message', async () => {
      const response = await testRequest(app).post('/tokens').send({
        email: 'user@example.com',
        password: 'testpassword',
      });
      expect(response.status).toBe(201);
      expect(response.body.token).toBeDefined();
      expect(response.body.message).toBe('OK');
      expect(response.body.userID).toBe(testUserID);
    });
  });
});
