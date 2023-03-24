import User from '../../src/models/user';
import '../mongodb_test_setup';
describe('User model testing', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  test('Can create and save new user document with email and password', async () => {
    const newUser = new User({
      email: 'hello@example.com',
      password: 'password123',
    });
    expect(newUser.email).toBe('hello@example.com');
    expect(newUser.password).toBe('password123');
    await newUser.save();
    expect(newUser._id).toBeDefined();
  });
});
