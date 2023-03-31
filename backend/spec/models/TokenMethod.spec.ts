import TokenMethods from '../../src/models/TokenMethods';
import JWT, { Secret } from 'jsonwebtoken';
const secret = process.env.JWT_SECRET as Secret;

describe('TokenMethods testing', () => {
  describe('generate method testing', () => {
    test('it returns a token as a string', () => {
      const token = TokenMethods.generate('user123');
      expect(typeof token).toBe('string');
      expect(token.length).toBeGreaterThan(0);
    });
  });
});
