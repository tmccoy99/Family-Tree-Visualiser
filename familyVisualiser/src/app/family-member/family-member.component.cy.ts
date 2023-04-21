import { FamilyMember } from '../family-member-data';
import { FamilyMemberComponent } from './family-member.component';

const mockMemberData: FamilyMember = {
  name: 'John Doe',
  birthYear: 1980,
  imageURL: '../../assets/default-profile-photo.png',
  children: [],
};

describe('FamilyMemberComponent', () => {
  it('displays image, name and birth year', () => {
    cy.mount(FamilyMemberComponent, {
      componentProperties: { data: mockMemberData },
    });
    cy.get('p.member-name').should('contain.text', 'John Doe');
    cy.get('p.member-birth').should('contain.text', '1980');
    cy.get('img.member-img').should(
      'have.attr',
      'src',
      '../../assets/default-profile-photo.png'
    );
  });

  // it('should not glow green before being clicked', () => {
  //   cy.mount
  // })
});
