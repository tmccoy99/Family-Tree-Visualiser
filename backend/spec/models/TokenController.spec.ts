import TokenController, { Payload } from '../../src/models/TokenController';
import JWT from 'jsonwebtoken';
import testRequest from 'supertest';
import '../mongodb_test_setup';
import app from '../../src/app';

describe('TokenController testing', () => {
  describe('generate method testing', () => {
    test('it returns a token as a string', () => {
      const token = TokenController.generateToken('user123');
      expect(typeof token).toBe('string');
      expect(token.length).toBeGreaterThan(0);
    });

    test('the payload of the string can be decoded, contains userID and has 10 minutes of duration', () => {
      const token = TokenController.generateToken('user123');
      const payload = JWT.decode(token) as Payload;
      expect(payload.userID).toBe('user123');
      expect(payload.exp - payload.iat).toBe(600);
    });
  });

  describe('Create token route testing', () => {
    test('POST /tokens route with an invalid email sends status 400 response', async () => {
      const response = await testRequest(app)
        .post('/tokens')
        .send({ email: 'test123@fake.com', password: 'piyiophph' });
      expect(response.status).toBe(400);
    });
  });
});
