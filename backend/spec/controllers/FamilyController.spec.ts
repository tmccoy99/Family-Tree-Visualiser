import testRequest from 'supertest';
import User, { IUser } from '../../src/models/user';
import FamilyMember, { IFamilyMember } from '../../src/models/family-member';
import '../mongodb_test_setup';
import JWT, { Secret } from 'jsonwebtoken';
import app from '../../src/app';

describe('Family Controller testing', () => {
  let testUser: IUser;
  let token: string;
  beforeAll(async () => {
    await User.deleteMany({});
    testUser = new User({
      email: 'testing123@example.com',
      password: 'secure',
    });
    await testUser.save();
    token = JWT.sign(testUser.id, process.env.JWT_SECRET as Secret);
  });

  afterAll(async () => {
    User.deleteMany({});
  });

  beforeEach(async () => {
    await FamilyMember.deleteMany({});
  });

  describe('POST /members route', () => {
    describe('with token, userID and required information', () => {
      test('sends 201 response', async () => {
        const response: testRequest.Response = await testRequest(app)
          .post('/members')
          .set({ Authorization: `Bearer ${token}` })
          .send({
            userID: testUser.id,
            name: 'Jeff',
            birthYear: 1999,
            root: true,
          });
        expect(response.status).toBe(201);
      });

      test('saves family member into database and returns valid token', async () => {
        const response = await testRequest(app)
          .post('/members')
          .set({ Authorization: `Bearer ${token}` })
          .send({
            userID: testUser.id,
            name: 'Jeff',
            birthYear: 1999,
            root: true,
          });
        const savedMember = await FamilyMember.findOne({});
        expect(
          JWT.verify(response.body.token, process.env.JWT_SECRET as Secret)
        ).toBeTruthy();
        expect(savedMember).toMatchObject({
          name: 'Jeff',
          birthYear: 1999,
        });
      });

      test('for root true, saves member id into the rootID field of the user', async () => {
        await testRequest(app)
          .post('/members')
          .set({ Authorization: `Bearer ${token}` })
          .send({
            userID: testUser.id,
            name: 'Jeff',
            birthYear: 1999,
            root: true,
          });
        const savedMember = (await FamilyMember.findOne({})) as IFamilyMember;
        const updatedUser = (await User.findOne({})) as IUser;
        expect(updatedUser.rootID?.toString()).toBe(savedMember.id);
      });
    });
  });
});
