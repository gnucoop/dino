describe('dino-edit-report-schema', () => {
  beforeEach(() => {
    cy.visit('/reports');
    cy.get('mat-grid-tile')
      .should('exist')
      .first()
      .find('.dino-grid-action-icons button')
      .first()
      .click();
  });

  it('should show a rendered Ajf Report Instance', async () => {
    cy.get('ajf-report').should('exist');
  });

  it('should show a form with all Report Schema basic attributes inputs', async () => {
    cy.get('.dino-report-attributes').should('be.visible');
  });

  it('should open a dialog for Importing a Report Schema from an xlsx file', async () => {
    cy.get('.dino-edit-report-schema-actions button').first().click();
    cy.get('dino-import-report-schema').should('be.visible');
  });
});
