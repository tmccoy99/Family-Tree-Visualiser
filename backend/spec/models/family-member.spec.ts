import FamilyMember, { IFamilyMember } from '../../src/models/family-member';
import '../mongodb_test_setup';
import mongoose from 'mongoose';

describe('Family Member Model', () => {
  beforeEach(async () => {
    await FamilyMember.deleteMany({});
  });

  test('can create and save model with required attributes', async () => {
    const newMember = new FamilyMember({
      name: 'Mr Test',
      birthYear: 1990,
    });
    await newMember.save();
    expect(newMember.id).toBeTruthy();
    expect(newMember.name).toBe('Mr Test');
    expect(newMember.birthYear).toBe(1990);
  });

  test('imageURL can be given, else default is assigned', async () => {
    const memberWithPhoto = new FamilyMember({
      name: 'Mr Test',
      birthYear: 1990,
      imageURL: 'example/url',
    });
    const memberWithoutPhoto = new FamilyMember({
      name: 'Suzie',
      birthYear: 1890,
    });
    await Promise.all([memberWithPhoto.save(), memberWithoutPhoto.save()]);
    expect(memberWithPhoto.imageURL).toBe('example/url');
    expect(memberWithoutPhoto.imageURL).toBe('../../assets/default_photo.png');
  });

  test('non-required fields can also be given', async () => {
    const newMember = new FamilyMember({
      name: 'Mr Test',
      birthYear: 1890,
      deathYear: 1990,
      children: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()],
      spouse: new mongoose.Types.ObjectId(),
    });
    await newMember.save();
    expect(newMember.id).toBeTruthy();
    expect(newMember.deathYear).toBe(1990);
    expect(newMember.children).toHaveLength(2);
    expect(newMember.spouse).toBeTruthy();
  });

  test('spouse reference can populate', async () => {
    const spouse = new FamilyMember({
      name: 'Mrs Test',
      birthYear: '1900',
    });
    await spouse.save();
    const member = new FamilyMember({
      name: 'Mr Test',
      birthYear: 1890,
      spouse: spouse._id,
    });
    await member.save();
    await member.populate('spouse');
    expect((member.spouse as IFamilyMember).name).toBe('Mrs Test');
  });

  test('children references can populate', async () => {
    const child1 = new FamilyMember({
      name: 'Bob',
      birthYear: '1900',
    });
    const child2 = new FamilyMember({
      name: 'Ellie',
      birthYear: '1930',
    });
    await Promise.all([child1.save(), child2.save()]);
    const parent = new FamilyMember({
      name: 'Erica',
      birthYear: '1850',
      children: [child1._id, child2._id],
    });
    await parent.save();
    await parent.populate('children');
    expect((parent.children[0] as IFamilyMember).name).toBe('Bob');
    expect((parent.children[1] as IFamilyMember).name).toBe('Ellie');
  });
});
