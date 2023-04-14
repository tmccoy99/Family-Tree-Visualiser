describe('sign up testing', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Can visit page and type in inputs', () => {
    cy.get('input#signup-email-input').type('e2e@testing.com');
    cy.get('input#signup-password-input').type('test password');
  });

  it('only after successfully signing up, navigates to /home', () => {
    cy.url().should('not.include', '/home');
    cy.get('input#signup-email-input').type('e2e@testing.com');
    cy.get('input#signup-password-input').type('test password');
    cy.get('button#submit-signup').click();
    cy.url().should('include', '/home');
  });
});
