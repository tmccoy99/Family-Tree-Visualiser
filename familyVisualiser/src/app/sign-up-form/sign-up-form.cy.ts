import { Interception } from 'cypress/types/net-stubbing';
import { SignUpFormComponent } from './sign-up-form.component';

describe('Sign up form', () => {
  beforeEach(() => {
    cy.mount(SignUpFormComponent);
  });
  test('it should have an email input and a password input', () => {
    cy.get('input#signup-email-input');
    cy.get('input#signup-password-input');
  });

  test('it should have a submit button with text "Submit"', () => {
    cy.get('button#submit-signup').should('have.text', 'Submit');
  });

  test('clicking submit button sends POST /users request with email and password', () => {
    cy.get('input#signup-email-input').type('test@example.com');
    cy.get('input#signup-password-input').type('test');
    cy.intercept('POST', '/users').as('createUser');
    cy.get('button#submit-signup').click();
    cy.wait('@createUser').then((interception: Interception) => {
      interception.request.body.email.should('equal', 'test@example.com');
      interception.request.body.password.should('equal', 'test');
    });
  });
});
