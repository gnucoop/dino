import {formSchemas} from '../../../e2e-app/src/test-ajf-formschema';

const url = `/forms/${formSchemas[0].id}`;

describe('dino-search-filters-dialog', () => {
  beforeEach(() => {
    cy.visit(url);
    cy.get('.mat-expansion-indicator').click();
    cy.get('mat-icon:contains("filter_list")').click();
    cy.get('dino-search-filters-dialog').should('exist');
  });

  it('should display a dino-search-filters-dialog component and its parts', () => {
    cy.get('.mat-button-wrapper:contains("Search")').should('exist');
    cy.get('.mat-button-wrapper:contains("Close")').should('exist');
    cy.get('mat-dialog-content mat-tab-group').should('exist');
  });

  it('should select the first tab by default', () => {
    cy.get('.mat-tab-label[role="tab"]')
      .should('exist')
      .first()
      .should('have.attr', 'aria-selected', 'true');
  });

  it('should display some number of filter widgets in the selected tab', () => {
    cy.get('dino-search-filters-widget').should('have.length.gt', 0);
  });

  it('should close the dialog and change the url with filter params when clicking Search button', () => {
    cy.url().then(initialUrl => {
      cy.get('.mat-card-content .mat-radio-button').first().click();
      cy.get('mat-chip').should('exist');
      cy.get('.mat-button-wrapper:contains("Search")').parent().click();
      cy.get('dino-search-filters-dialog').should('not.exist');
      cy.url().should('not.eq', initialUrl);
    });
  });
});
