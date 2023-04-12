import { Interception } from 'cypress/types/net-stubbing';
import { SignUpFormComponent } from './sign-up-form.component';

describe('Sign up form', () => {
  test('it should have an email input and a password input', () => {
    cy.mount(SignUpFormComponent);
    cy.get('input#signup-email-input');
    cy.get('input#signup-password-input');
  });

  test('it should have a submit button with text "Submit"', () => {
    cy.mount(SignUpFormComponent);
    cy.get('button#submit-signup').should('have.text', 'Submit');
  });

  test('clicking submit button sends POST /users request with email and password', () => {
    cy.mount(SignUpFormComponent);
    cy.get('input#signup-email-input').type('test@example.com');
    cy.get('input#signup-password-input').type('test');
    cy.intercept('POST', '/users').as('createUser');
    cy.get('button#submit-signup').click();
    cy.wait('@createUser').then((interception: Interception) => {
      expect(interception.request.body.email).to.equal('test@example.com');
      expect(interception.request.body.password).to.equal('test');
    });
  });
});
