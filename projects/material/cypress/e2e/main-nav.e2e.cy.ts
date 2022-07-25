describe('dino-main-nav', () => {
  beforeEach(() => cy.visit('/dashboard'));

  it('should display a Main Nav component', () => {
    cy.get('dino-main-nav').should('exist');
  });

  it('should expand the Menu showing section labels', () => {
    cy.get('button[aria-label="Toggle menu button"]').should('exist');
    cy.get('.mat-sidenav.dino-sidenav').should('exist').should('not.have.class', 'extended');
    cy.get('button[aria-label="Toggle menu button"]').click();
    cy.get('.mat-sidenav.dino-sidenav').should('exist').should('have.class', 'extended');
  });

  it('should logout the user and redirect to the login page', () => {
    cy.get('.dino-logout-button').should('exist').click();
    cy.get('dino-login').should('exist');
    cy.url().should('contain', 'login');
  });
});
