import { AppComponent } from './app.component';

describe('App component', () => {
  beforeEach(() => {
    cy.mount(AppComponent);
  });

  test('app should render', () => {
    cy.get('main');
  });

  test('header with text TreeGenie and logo image should be rendered', () => {
    const header = cy.get('#site-header');
    header.should('contain.text', 'TreeGenie');
    header.within(() => {
      cy.get('img').should('have.attr', 'src', '../assets/logo.png');
    });
  });
});
