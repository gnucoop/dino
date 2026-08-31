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
    // The icon now asks first: a logout deletes the local database, and on a
    // device that collects data offline that choice has to be the user's.
    cy.get('dino-session-dialog').should('exist');
    cy.get('.dino-session-dialog-logout-button').click();
    cy.get('dino-login').should('exist');
    cy.url().should('contain', 'login');
  });

  it('should keep the local data when the user only ends the session', () => {
    cy.get('.dino-logout-button').should('exist').click();
    cy.get('.dino-session-dialog-keep-button').click();
    cy.get('dino-login').should('exist');
    cy.url().should('contain', 'login');
  });

  it('should leave the session alone when the logout question is cancelled', () => {
    cy.get('.dino-logout-button').should('exist').click();
    cy.get('.dino-session-dialog-cancel-button').click();
    cy.get('dino-session-dialog').should('not.exist');
    cy.get('dino-main-nav').should('exist');
    cy.url().should('not.contain', 'login');
  });
});
