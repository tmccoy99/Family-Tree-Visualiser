import TokenMethods, { Payload } from '../../src/models/TokenController';
import JWT from 'jsonwebtoken';

describe('TokenMethods testing', () => {
  describe('generate method testing', () => {
    test('it returns a token as a string', () => {
      const token = TokenMethods.generate('user123');
      expect(typeof token).toBe('string');
      expect(token.length).toBeGreaterThan(0);
    });

    test('the payload of the string can be decoded, contains userID and has 10 minutes of duration', () => {
      const token = TokenMethods.generate('user123');
      const payload = JWT.decode(token) as Payload;
      expect(payload.userID).toBe('user123');
      expect(payload.exp - payload.iat).toBe(600);
    });
  });
});
