describe('dino-export-form', () => {
  beforeEach(() => {
    cy.visit('/forms');
    cy.get('dino-collect').should('exist');
    cy.get('mat-grid-tile').should('exist').first().click();
  });

  it('should export filtered data in xlsx', () => {
    // The export button sits in the toolbar now, with nothing to expand first.
    cy.get('.dino-filters-toolbar .dino-export-button').click();
    // Same class on the button that confirms the export, inside the dialog footer.
    cy.get('.dino-export-footer .dino-export-button').click();
  });
});
