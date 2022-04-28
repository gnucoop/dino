describe('dino-edit-report', () => {
  beforeEach(() => cy.visit('/reports'));

  it('should enter a view report page', () => {
    cy.get('dino-collect').should('exist');
    cy.get('mat-grid-tile').should('exist').first().click();
    cy.get('dino-list').should('exist');
    cy.get('mat-row').should('exist').first().click();
    cy.get('.mat-cell.dino-row-actions .mat-icon.mat-list-icon').first().next().click();
    cy.get('dino-edit-report').should('exist');
    cy.url().should('contain', 'reports').should('contain', 'view');
  });
});
