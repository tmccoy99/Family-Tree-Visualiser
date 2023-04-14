import { Interception } from 'cypress/types/net-stubbing';
import { SignUpFormComponent } from './sign-up-form.component';

describe('Sign up form', () => {
  it('it should have an email input and a password input', () => {
    cy.mount(SignUpFormComponent);
    cy.get('input#signup-email-input');
    cy.get('input#signup-password-input');
  });

  it('it should have a submit button with text "Submit"', () => {
    cy.mount(SignUpFormComponent);
    cy.get('button#submit-signup').should('have.text', 'Submit');
  });
});
