describe('dino-edit-form', () => {
  beforeEach(() => cy.visit('/forms'));

  it('should enter an edit form page', () => {
    cy.get('dino-collect').should('exist');
    cy.get('mat-grid-tile').should('exist').first().click();
    cy.get('dino-list').should('exist');
    cy.get('mat-row').should('exist').first().click();
    cy.get('.mat-cell.dino-row-actions .mat-icon.mat-list-icon').first().click();
    cy.get('dino-edit-form').should('exist');
    cy.url().should('contain', 'forms').should('contain', 'edit');
  });
});
