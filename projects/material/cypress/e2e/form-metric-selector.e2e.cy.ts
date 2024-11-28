describe('dino-form-metric-selector', () => {
  beforeEach(() => {
    cy.visit('/forms');
    cy.get('dino-collect').should('exist');
    cy.get('mat-grid-tile').should('exist').first().click();
    cy.get('.mat-mdc-row:not(.dino-row-details)').first().invoke('addClass', 'dino-hover').click();
    cy.get('.mat-mdc-cell.dino-row-actions .mat-icon')
      .contains('create ')
      .first()
      .click({force: true});
  });

  it('should enter a form-metric-selector page', () => {
    cy.get('mat-stepper').should('exist');
    cy.get('.dino-edit-form-step-container').should('exist');
    cy.get('dino-form-metric-selector').should('exist');
    cy.url().should('contain', 'forms').should('contain', 'edit');
  });
});
