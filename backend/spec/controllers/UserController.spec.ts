import '../mongodb_test_setup';
import app from '../../src/app';
import testRequest from 'supertest';

describe('UserController testing', () => {
  describe('POST /users route', () => {
    test('response to valid email and password has status 201 and message ok', async () => {
      const response = await testRequest(app)
        .post('/users')
        .send({ email: 'hello@testing.com', password: 'testpassword' });
      expect(response.status).toBe(201);
      expect(response.body.message).toBe('OK');
    });
  });
});
