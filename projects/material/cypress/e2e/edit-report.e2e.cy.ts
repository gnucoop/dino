describe('dino-edit-report', () => {
  beforeEach(() => cy.visit('/reports'));

  // The first report schema (Test Report) has a single report data entry in the
  // test fixtures (dinoapp/src/testing/test-ajf-reportdata).
  const REPORT_ROWS = 1;

  it('should enter a view report page', () => {
    cy.get('dino-collect').should('exist');
    cy.get('mat-grid-tile').should('exist').first().click();
    cy.get('dino-list').should('exist');
    cy.get('.mat-mdc-row:not(.dino-row-details)')
      .should('have.length', REPORT_ROWS)
      .first()
      .invoke('addClass', 'dino-hover')
      .click();

    cy.get('.mat-mdc-cell.dino-row-actions .mat-icon')
      .contains('visibility ')
      .first()
      .click({force: true});
    cy.get('dino-edit-report').should('exist');
    cy.url().should('contain', 'reports').should('contain', 'view');
  });
});
