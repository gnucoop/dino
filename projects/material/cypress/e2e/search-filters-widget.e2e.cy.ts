import {formSchemas} from '../../../e2e-app/src/test-ajf-formschema';

const url = `/forms/${formSchemas[0].id}`;

describe('dino-search-filters-widget', () => {
  beforeEach(() => {
    cy.visit(url);
    cy.get('.mat-expansion-indicator').click();
    cy.get('mat-icon:contains("filter_list")').click();
  });

  it('should display a number of dino-search-filters-widget components', () => {
    cy.get('dino-search-filters-widget').should('have.length.gt', 0);
  });

  it('should display a create filter button in disabled state', () => {
    cy.get('.dino-create-filter-button')
      .should('be.visible')
      .should('have.class', 'mat-button-disabled');
  });

  it('should display a mat-input', () => {
    cy.get('.mat-card-content input').should('be.visible');
  });
});
