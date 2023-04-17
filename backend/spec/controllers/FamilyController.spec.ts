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
    test('with token, userID and required information, sends 201 response', async () => {
      const response: testRequest.Response = await testRequest(app)
        .post('/members')
        .set({ Authorization: `Bearer ${token}` })
        .send({
          userID: testUser.id,
          name: 'Jeff',
          birthYear: 1999,
          additionType: 'root',
        });
      expect(response.status).toBe(201);
    });

    test('with token, userID and required information, saves family member into database', async () => {
      await testRequest(app)
        .post('/members')
        .set({ Authorization: `Bearer ${token}` })
        .send({
          userID: testUser.id,
          name: 'Jeff',
          birthYear: 1999,
          additionType: 'root',
        });
      const savedMember = await FamilyMember.findOne({});
      expect(savedMember).toBeTruthy();
      expect(savedMember).toMatchObject({
        name: 'Jeff',
        birthYear: 1999,
      });
    });
  });
});
