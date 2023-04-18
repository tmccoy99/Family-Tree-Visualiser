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
      test('sends 201 response and message OK', async () => {
        const response: testRequest.Response = await testRequest(app)
          .post('/members')
          .set({ Authorization: `Bearer ${token}` })
          .send({
            name: 'Jeff',
            birthYear: 1999,
            additionType: 'root',
          });
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('OK');
      });

      test('saves family member into database and returns valid token', async () => {
        const response = await testRequest(app)
          .post('/members')
          .set({ Authorization: `Bearer ${token}` })
          .send({
            name: 'Grace',
            birthYear: 1959,
            additionType: 'root',
          });
        const savedMember = await FamilyMember.findOne({});
        expect(
          JWT.verify(response.body.token, process.env.JWT_SECRET as Secret)
        ).toBeTruthy();
        expect(savedMember).toMatchObject({
          name: 'Grace',
          birthYear: 1959,
        });
      });

      test('for additionType root, saves member id into the rootID field of the user', async () => {
        await testRequest(app)
          .post('/members')
          .set({ Authorization: `Bearer ${token}` })
          .send({
            name: 'Karen',
            birthYear: 2000,
            additionType: 'root',
          });
        const savedMember = (await FamilyMember.findOne({})) as IFamilyMember;
        const updatedUser = (await User.findOne({})) as IUser;
        expect(updatedUser.rootID?.toString()).toBe(savedMember.id);
      });

      test('for additionType spouse, saves member id into the spouse field of its spouse', async () => {
        const savedMember: IFamilyMember = new FamilyMember({
          name: 'Derek',
          birthYear: 1906,
        });
        await savedMember.save();
        await testRequest(app)
          .post('/members')
          .set({ Authorization: `Bearer ${token}` })
          .send({
            name: 'Dave',
            birthYear: 1984,
            additionType: 'spouse',
            spouseID: savedMember.id,
          });
        const updatedMember = (await FamilyMember.findById(
          savedMember.id
        )) as IFamilyMember;
        const spouse = (await FamilyMember.findOne({
          name: 'Dave',
        })) as IFamilyMember;
        expect(updatedMember.spouse?.toString()).toBe(spouse.id);
      });

      test('for additionType child, saves member id into the children array of its parent', async () => {
        const parent: IFamilyMember = new FamilyMember({
          name: 'Derek',
          birthYear: 1906,
        });
        await parent.save();
        await testRequest(app)
          .post('/members')
          .set({ Authorization: `Bearer ${token}` })
          .send({
            name: 'Dave',
            birthYear: 1984,
            additionType: 'child',
            parentID: parent.id,
          });
        const updatedParent = (await FamilyMember.findById(
          parent.id
        )) as IFamilyMember;
        const child = (await FamilyMember.findOne({
          name: 'Dave',
        })) as IFamilyMember;
        expect(updatedParent.children[0].toString()).toBe(child.id);
      });
    });

    describe('error handling', () => {
      test('if token is invalid, response has 401 status and auth error message', async () => {
        const fakeToken: string = JWT.sign(
          {
            userID: testUser.id,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 10 * 60,
          },
          'fake secret' as Secret
        );
        const response = await testRequest(app)
          .post('/members')
          .set({ Authorization: `Bearer ${fakeToken}` })
          .send({
            name: 'Jeff',
            birthYear: 1999,
            additionType: 'root',
          });
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('auth error');
      });

      test('other errors return status 500 and message could not create', async () => {
        const response = await testRequest(app)
          .post('/members')
          .set({ Authorization: `Bearer ${token}` })
          .send({
            name: 'Jeff',
            birthYear: 'hello',
            additionType: 'root',
          });
        expect(response.status).toBe(500);
        expect(response.body.message).toBe('could not create');
      });
    });
  });
});
