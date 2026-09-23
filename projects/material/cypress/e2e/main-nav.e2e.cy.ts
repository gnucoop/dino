describe('dino-main-nav', () => {
  beforeEach(() => cy.visit('/dashboard'));

  it('should display a Main Nav component', () => {
    cy.get('dino-main-nav').should('exist');
  });

  it('should not display a top bar on a wide viewport', () => {
    cy.viewport(1280, 800);
    cy.get('dino-main-nav').should('not.have.class', 'dino-shell-compact');
    cy.get('.dino-mobile-bar').should('not.exist');
  });

  it('should expand the Menu showing section labels', () => {
    cy.get('button[aria-label="Toggle menu button"]').should('exist');
    cy.get('.mat-sidenav.dino-sidenav').should('exist').should('not.have.class', 'extended');
    cy.get('button[aria-label="Toggle menu button"]').click();
    cy.get('.mat-sidenav.dino-sidenav').should('exist').should('have.class', 'extended');
    cy.get('.dino-nav-group-label').should('exist');
  });

  it('should display the sync button and the active user card in the sidenav', () => {
    cy.get('.dino-sidenav-utilities .dino-sync-button').should('exist');
    cy.get('.dino-sidenav-utilities .dino-user-card').should('exist');
  });

  it('should display the page header with a title', () => {
    cy.get('dino-breadcrumbs .dino-page-title').should('exist').should('not.be.empty');
  });

  it('should switch to the compact layout on a narrow viewport', () => {
    cy.viewport(480, 800);
    cy.get('dino-main-nav').should('have.class', 'dino-shell-compact');
    cy.get('.dino-mobile-bar').should('be.visible');
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
