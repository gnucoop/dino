describe('dino-form-creator-hub', () => {
  beforeEach(() => {
    cy.visit('/aggregation');
    // The floating button of the section became the toolbar action of the filters bar.
    cy.get('.dino-filters-toolbar button[toolbarActions]').should('be.visible').click();
  });

  it('should open the Form Creator hub', () => {
    cy.get('dino-form-creator-hub .dino-selector-container').should('be.visible');
  });

  it('should display a toggle for each schema present', () => {
    cy.get('dino-form-creator-hub .mat-button-toggle-group')
      .find('.mat-button-toggle')
      .should('have.length', 2);
  });

  it('should redirect the user to the Form Creation when the action button is clicked', () => {
    cy.get('dino-form-creator-hub .mat-button-toggle').first().should('be.visible').click();
    cy.get('.dino-apply-btn').should('be.visible').click();
    cy.url().should('contain', 'forms').should('contain', 'create');
  });
});
