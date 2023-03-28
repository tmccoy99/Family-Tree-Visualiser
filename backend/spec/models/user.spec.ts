import User, { IUser } from '../../src/models/user';
import '../mongodb_test_setup';
import bcrypt from 'bcrypt';
jest.mock('bcrypt', () => ({
  hash: jest
    .fn()
    .mockImplementation(
      (password: string, saltRounds: number): Promise<string> =>
        Promise.resolve(`hashed ${password}`)
    ),
}));
const mockHashFunction = bcrypt.hash as jest.Mock;
describe('User model testing', () => {
  let newUser: IUser;
  beforeEach(async () => {
    await User.deleteMany({});
    mockHashFunction.mockClear();
    newUser = new User({
      email: 'hello@example.com',
      password: 'password123',
    });
  });

  describe('basic tests', () => {
    test('can create and save new user document with email and password', async () => {
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
      await newUser.save();
      expect(newUser.password).toBe('hashed password123');
      expect(mockHashFunction).toHaveBeenCalledWith('password123', 10);
    });
  });

  test('modified passwords are re-encrypted on save', async () => {
    await newUser.save();
    newUser.password = 'new password';
    await newUser.save();
    expect(newUser.password).toBe('hashed new password');
    expect(mockHashFunction).toHaveBeenLastCalledWith('new password', 10);
  });

  test('users can be modified without re-hashing password if password unchanged', async () => {
    await newUser.save();
    newUser.email = 'newemail@talktalk.net';
    await newUser.save();
    expect(mockHashFunction.mock.calls.length).toBe(1);
  });

  test('hashing errors are passed on by the pre save function', () => {
    const mockError = new Error('mock error');
    mockHashFunction.mockRejectedValueOnce(mockError);
    newUser.save().catch((err) => {
      expect(err).toEqual(mockError);
    });
  });

  // describe('password validation testing', () => {
  //   const mockCompareFunction = jest.spyOn(bcrypt, 'compare') as jest.Mock;
  //   mockCompareFunction.mockImplementation(
  //     (password: string, hash: string): Promise<boolean> => {
  //       return Promise.resolve(mockHashFunction(password) === hash);
  //     }
  //   );
  //   mock
  //   test('calling validatePassword with correct password returns true', async () => {
  //     mockHashFunction.mockResolved
  //     await newUser.save();
  //     expect(await newUser.validatePassword('password123')).toBe(true);
  //     expect(mockCompareFunction).toHaveBeenCalledWith('password123')
  //   });
  // });
});
