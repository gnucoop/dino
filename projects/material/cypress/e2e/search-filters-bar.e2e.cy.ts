const filterFieldMdcCss = (field: string) => `.mat-mdc-input-element[formcontrolname="${field}"]`;

describe('dino-search-filters-bar', () => {
  beforeEach(() => {
    cy.visit('/forms');
    cy.get('dino-collect').should('exist');
    cy.get('mat-grid-tile').should('exist').first().click();
  });

  it('should display a Filter Bar component and its filters', () => {
    cy.get('dino-search-filters-bar').should('be.visible');
    // The expansion panel became a modal, and the fields of the simple filters
    // live in its first tab.
    cy.get('.dino-filters-dialog-button').should('be.visible').click();
    cy.get('.dino-filters-modal').should('be.visible');
    cy.get(filterFieldMdcCss('dateStart')).should('be.visible');
    cy.get(filterFieldMdcCss('dateEnd')).should('be.visible');
  });

  it('should open the advanced filters in the second tab', () => {
    cy.get('.dino-filters-modal').should('not.exist');
    cy.get('.dino-filters-dialog-button').click();
    cy.get('.dino-filters-modal-tabs mat-button-toggle[value="advanced"]').should('exist').click();
    cy.get('.dino-filters-advanced').should('be.visible');
    cy.get('dino-search-filters-widget').should('have.length.gt', 0);
  });

  it('should close the modal and leave the filters alone', () => {
    cy.get('.dino-filters-dialog-button').click();
    cy.get('.dino-filters-modal').should('be.visible');
    cy.get('.dino-filters-modal-actions button:contains("Close")').click();
    cy.get('.dino-filters-modal').should('not.exist');
    cy.url().should('not.contain', '?filters=');
  });
});
