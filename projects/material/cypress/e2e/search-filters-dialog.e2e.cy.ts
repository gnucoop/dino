import {openFirstFormList} from '../support/navigation';

/**
 * The advanced filters are no longer a dialog of their own: they are the second
 * tab of the Filters modal, and `dino-search-filters-dialog` is not rendered by
 * any template any more.
 */
const openAdvancedFilters = () => {
  openFirstFormList();
  cy.get('.dino-filters-dialog-button').should('be.visible').click();
  cy.get('.dino-filters-modal').should('be.visible');
  cy.get('.dino-filters-modal-tabs mat-button-toggle[value="advanced"]').click();
  cy.get('.dino-filters-advanced').should('be.visible');
};

describe('dino-search-filters advanced tab', () => {
  beforeEach(openAdvancedFilters);

  it('should display the modal actions and the filter groups', () => {
    cy.get('.dino-filters-modal-actions button:contains("Search")').should('exist');
    cy.get('.dino-filters-modal-actions button:contains("Close")').should('exist');
    cy.get('.dino-filters-advanced mat-tab-group').should('exist');
  });

  it('should close the modal and change the url with filter params when clicking Search button', () => {
    cy.url().then(initialUrl => {
      // A single choice filter is a segmented group since the ajf restyle: the
      // options are buttons with role="radio", not Material radio buttons.
      cy.get('.mat-mdc-card-content .ajf-segment').eq(1).should('exist');
      cy.get('.mat-mdc-card-content .ajf-segment').eq(1).click();
      cy.get('.mat-mdc-card-actions .dino-create-filter-button').first().should('exist');
      cy.get('.mat-mdc-card-actions .dino-create-filter-button').first().should('not.be.disabled');
      cy.get('.mat-mdc-card-actions .dino-create-filter-button').first().click();
      cy.get('.mat-mdc-chip').should('exist');
      cy.get('.dino-filters-modal-actions button:contains("Search")').click();
      cy.get('.dino-filters-modal').should('not.exist');
      cy.url().should('not.eq', initialUrl);
    });
  });
});
