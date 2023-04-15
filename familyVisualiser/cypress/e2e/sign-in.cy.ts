describe('sign up testing', () => {
  function signup(email: string, password: string): void {
    cy.get('input#signup-email-input').type(email);
    cy.get('input#signup-password-input').type(password);
    cy.get('button#submit-signup').click();
  }
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
    signup('e2e@testing.com', 'testpassword');
    cy.url().should('include', '/home');
    cy.window().its('localStorage.userID').should('be.ok');
    cy.window().its('localStorage.token').should('be.ok');
  });

  it('duplicate signups trigger warning message and do not navigate to homepage', () => {
    signup('e2e@testing.com', 'testpassword');
    cy.contains('Your Family Tree');
    cy.visit('/');
    signup('e2e@testing.com', 'testpassword');
    cy.url().should('not.include', '/home');
    cy.contains('The provided email is already registered').should('exist');
  });
});
