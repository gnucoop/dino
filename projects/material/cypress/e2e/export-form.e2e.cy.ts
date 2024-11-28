describe('dino-export-form', () => {
  beforeEach(() => {
    cy.visit('/forms');
    cy.get('dino-collect').should('exist');
    cy.get('mat-grid-tile').should('exist').first().click();
  });

  it('should export filtered data in xlsx', () => {
    cy.get('.mat-expansion-indicator').click();
    cy.get('.dino-export-button').click();
    // cy.get('.mat-list-item:contains("XLSX")').click();
    cy.get('.mdc-button:contains("Export")').click();
    // const downloadsFolder = Cypress.config('downloadsFolder');
    // cy.readFile(join(downloadsFolder, 'cbm.xls'));
  });
});
