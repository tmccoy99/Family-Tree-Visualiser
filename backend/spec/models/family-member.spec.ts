import FamilyMember from '../../src/models/family-member';
import '../mongodb_test_setup';

describe('Family Member Model', () => {
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
});
