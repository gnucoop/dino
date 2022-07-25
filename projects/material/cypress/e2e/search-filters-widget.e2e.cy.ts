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

  it('should display a mat-slide-toggle in disabled state', () => {
    cy.get('mat-slide-toggle').should('be.visible').should('have.class', 'mat-disabled');
  });

  it('should display a mat-input', () => {
    cy.get('.mat-card-content input').should('be.visible');
  });
});
