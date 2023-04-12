import { AppComponent } from './app.component';

describe('App component', () => {
  test('App should render', () => {
    cy.mount(AppComponent);
    cy.get('main');
  });
});
