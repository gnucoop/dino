describe('dino-create-report', () => {
  beforeEach(() => {
    cy.visit('/reports');
    cy.get('dino-collect').should('exist');
    cy.get('mat-grid-tile').should('exist').first().click();
    cy.get('dino-list').should('exist');
    cy.get('dino-floating-button button').should('exist').first().click();
  });

  it('should enter a create report page', async () => {
    cy.get('dino-create-report').should('exist');
    cy.url().should('contain', 'create').should('contain', 'report');
  });
});
