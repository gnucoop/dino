describe('dino-create-form', () => {
  beforeEach(() => {
    cy.visit('/forms');
    cy.get('dino-collect').should('exist');
    cy.get('mat-grid-tile').should('exist').first().click();
    cy.get('dino-floating-button button').should('exist').first().click();
  });

  it('should enter a create form page', () => {
    cy.get('dino-create-form').should('exist');
    cy.url().should('contain', 'create').should('contain', 'form');
  });

  it('should show a Metric selector', () => {
    cy.get('dino-form-metric-selector').should('exist');
  });
});
