import User from '../../src/models/user';
import '../mongodb_test_setup';
describe('User model testing', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  test('can create and save new user document with email and password', async () => {
    const newUser = new User({
      email: 'hello@example.com',
      password: 'password123',
    });
    expect(newUser.email).toBe('hello@example.com');
    expect(newUser.password).toBe('password123');
    await newUser.save();
    expect(newUser._id).toBeDefined();
  });

  test('cannot save two users with identical emails', async () => {
    const user1 = new User({
      email: 'hello@example.com',
      password: 'password123',
    });
    await user1.save();
    const user2 = new User({
      email: 'hello@example.com',
      password: 'verysecure',
    });
    await user2.save().catch((err) => {
      expect(err).not.toBeNull();
    });
  });
});
