describe('sign up testing', () => {
  beforeEach(() => {
    cy.request('http://localhost:8085/dbreset');
    cy.visit('/');
  });

  it('Can visit page and type in inputs', () => {
    cy.get('input#signup-email-input').type('e2e@testing.com');
    cy.get('input#signup-password-input').type('test password');
  });

  it('only after successfully signing up, navigates to /home and stores token and userID in localStorage', () => {
    cy.url().should('not.include', '/home');
    cy.get('input#signup-email-input').type('e2e@testing.com');
    cy.get('input#signup-password-input').type('test password');
    cy.get('button#submit-signup').click();
    cy.url().should('include', '/home');
    cy.window().its('localStorage.userID').should('be.ok');
    cy.window().its('localStorage.token').should('be.ok');
  });
});
