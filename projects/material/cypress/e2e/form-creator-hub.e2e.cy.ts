describe('dino-form-creator-hub', () => {
  beforeEach(() => {
    cy.visit('/aggregation');
    cy.get('.mat-mdc-fab.mat-fab-bottom-right').should('exist');
    cy.get('.mat-mdc-fab.mat-fab-bottom-right').should('be.visible').click();
  });

  it('should open the Form Creator hub', () => {
    cy.get('dino-form-creator-hub .dino-selector-container').should('be.visible');
  });

  it('should display a toggle group', () => {
    cy.get('.mat-button-toggle-group').should('exist').should('be.visible');
  });

  it('should display a single toggle for the only schema present', () => {
    cy.get('.mat-button-toggle-group').find('.mat-button-toggle').should('have.length', 1);
  });

  it('should redirect the user to the Form Creation when the action button is clicked', () => {
    cy.get('.mat-button-toggle').should('be.visible').click();
    cy.get('.dino-apply-btn').should('be.visible').click();
    cy.url().should('contain', 'forms').should('contain', 'create');
  });
});
