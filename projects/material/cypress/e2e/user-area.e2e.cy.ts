describe('dino-user-area', () => {
  it('should reach the User Area page from the user menu', () => {
    cy.visit('/dashboard');
    cy.get('.dino-user-card-identity').should('exist').click();
    cy.get('.dino-user-menu').contains('User Area').click();
    cy.url().should('contain', '/user-area');
    cy.get('dino-user-area').should('exist');
  });

  it('should keep the app shell visible and offer no close button', () => {
    cy.visit('/user-area/password');
    cy.get('dino-main-nav .mat-sidenav.dino-sidenav').should('exist');
    cy.get('dino-user-area dino-breadcrumbs .dino-page-title').should('contain', 'User Area');
    cy.get('dino-user-area').contains('button', 'Close').should('not.exist');
  });

  it('should open the tab named by the url', () => {
    cy.visit('/user-area/theme');
    cy.get('dino-user-area .mat-mdc-tab.mdc-tab--active').should('contain', 'DINO Theme');
  });

  it('should write the picked tab into the url', () => {
    cy.visit('/user-area/password');
    cy.get('dino-user-area .mat-mdc-tab').contains('DINO Theme').click();
    cy.url().should('contain', '/user-area/theme');
  });

  it('should keep what was typed when moving between tabs', () => {
    cy.visit('/user-area/password');
    cy.get('dino-user-area input[type="password"]').first().type('secret123');
    cy.get('dino-user-area .mat-mdc-tab').contains('DINO Theme').click();
    cy.get('dino-user-area .mat-mdc-tab').contains('Password').click();
    cy.get('dino-user-area input[type="password"]').first().should('have.value', 'secret123');
  });

  it('should fall back to the first tab on an unknown slug', () => {
    cy.visit('/user-area/bogus');
    cy.get('dino-user-area .mat-mdc-tab.mdc-tab--active').should('contain', 'Password');
  });
});
