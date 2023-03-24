import User from '../../src/models/user';

describe('User model testing', () => {
  test('Can create new user document with email and password', () => {
    new User({ name: 'First User', email: 'hello@example.com' });
  });
});
