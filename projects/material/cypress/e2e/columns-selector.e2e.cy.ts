describe('dino-columns-selector', () => {
  beforeEach(() => {
    cy.visit('/forms');
    cy.get('dino-collect').should('exist');
    cy.get('mat-grid-tile').should('be.visible');
    cy.get('mat-grid-tile').should('exist').first().click();
  });

  it('should display the column selector button', () => {
    cy.get('.mat-mdc-fab.dino-columns-sel-btn').should('be.visible');
  });

  it('should open the column selector', () => {
    cy.get('.mat-mdc-fab.dino-columns-sel-btn').trigger('mouseover').click();
    cy.get('dino-columns-selector .dino-selector-container').should('be.visible');
  });

  it('should filter the available columns in the selector', () => {
    cy.get('.mat-mdc-fab.dino-columns-sel-btn').trigger('mouseover').click();
    cy.get('dino-columns-selector .dino-selector-container').should('be.visible');
    cy.get('.dino-column-selector')
      .its('length')
      .then(columnToggles => {
        cy.get('dino-columns-selector mat-form-field')
          .first()
          .click()
          .find('.mat-mdc-input-element')
          .type('age');
        cy.get('.dino-column-selector')
          .should('have.length.lessThan', columnToggles)
          .should('have.length', 2);
      });
  });
});
