import User from '../../src/models/user';
import '../mongodb_test_setup';
import bcrypt from 'bcrypt';
jest.mock('bcrypt', () => ({
  hash: jest
    .fn()
    .mockImplementation((password: string): string => password) as jest.Mock,
}));
const mockHashFunction = bcrypt.hash as jest.Mock;

describe('User model testing', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    mockHashFunction.mockClear();
  });

  describe('basic tests', () => {
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

    test('cannot save a user that does not have an email or password', async () => {
      const noEmailUser = new User({
        password: 'hello',
      });
      const noPasswordUser = new User({
        email: 'test@yahoo.uk',
      });
      noEmailUser.save().catch((err) => {
        expect(err).not.toBeNull();
      });
      noPasswordUser.save().catch((err) => {
        expect(err).not.toBeNull();
      });
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

  describe('password encryption testing', () => {
    test('passwords for new users are encrypted on save', async () => {
      const newUser = new User({
        email: 'hello@example.com',
        password: 'password123',
      });
      mockHashFunction.mockResolvedValueOnce('hashed password');
      await newUser.save();
      expect(newUser.password).toBe('hashed password');
      expect(mockHashFunction).toHaveBeenCalledWith('password123', 10);
    });
  });

  test('modified passwords are re-encrypted on save', async () => {
    const newUser = new User({
      email: 'hello@example.com',
      password: 'password123',
    });
    await newUser.save();
    mockHashFunction.mockResolvedValueOnce('re-hashed password');
    newUser.password = 'new password';
    await newUser.save();
    expect(newUser.password).toBe('re-hashed password');
    expect(mockHashFunction).toHaveBeenLastCalledWith('new password', 10);
  });
});
