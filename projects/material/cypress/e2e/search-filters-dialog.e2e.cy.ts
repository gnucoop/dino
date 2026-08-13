import {openFirstFormList} from '../support/navigation';

describe('dino-search-filters-dialog', () => {
  beforeEach(() => {
    openFirstFormList();
    cy.get('.mat-expansion-indicator').click();
    cy.get('.dino-filters-dialog-button').should('be.visible');
    cy.get('.dino-filters-dialog-button').click();
    cy.get('dino-search-filters-dialog').should('exist');
  });

  it('should display a dino-search-filters-dialog component and its parts', () => {
    cy.get('.mat-mdc-raised-button:contains("Search")').should('exist');
    cy.get('.mat-mdc-raised-button:contains("Close")').should('exist');
    cy.get('mat-dialog-content mat-tab-group').should('exist');
  });

  it('should select the first tab by default', () => {
    cy.get('.mat-mdc-tab[role="tab"]')
      .should('exist')
      .first()
      .should('have.attr', 'aria-selected', 'true');
  });

  it('should display some number of filter widgets in the selected tab', () => {
    cy.get('dino-search-filters-widget').should('have.length.gt', 0);
  });

  it('should close the dialog and change the url with filter params when clicking Search button', () => {
    cy.url().then(initialUrl => {
      cy.get('.mat-mdc-card-content .mat-mdc-radio-button .mdc-form-field').eq(1).should('exist');
      cy.get('.mat-mdc-card-content .mat-mdc-radio-button .mdc-form-field').eq(1).click();
      cy.get('.mat-mdc-card-actions .dino-create-filter-button').first().should('exist');
      cy.get('.mat-mdc-card-actions .dino-create-filter-button').first().should('not.be.disabled');
      cy.get('.mat-mdc-card-actions .dino-create-filter-button').first().click();
      cy.get('.mat-mdc-chip').should('exist');
      cy.get('.mat-mdc-raised-button:contains("Search")').should('exist');
      cy.get('.mat-mdc-raised-button:contains("Search")').click();
      cy.get('dino-search-filters-dialog').should('not.exist');
      cy.url().should('not.eq', initialUrl);
    });
  });
});
