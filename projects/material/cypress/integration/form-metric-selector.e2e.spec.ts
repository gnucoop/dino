describe('dino-form-metric-selector', () => {
  beforeEach(() => cy.visit('/forms'));

  it('should enter a form-metric-selector page', () => {
    cy.get('dino-collect').should('exist');
    cy.get('mat-grid-tile').should('exist').first().click();
    cy.get('dino-list').should('exist');
    cy.get('mat-row').should('exist').first().click();
    cy.get('.mat-cell.dino-row-actions .mat-icon.mat-list-icon').first().click();
    cy.get('mat-stepper').should('exist');
    cy.get('.dino-edit-form-step-container').should('exist');
    cy.get('dino-form-metric-selector').should('exist');
    cy.url().should('contain', 'forms').should('contain', 'edit');
  });
});
