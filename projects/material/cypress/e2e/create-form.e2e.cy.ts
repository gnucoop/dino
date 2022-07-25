import {formSchemas} from '../../../e2e-app/src/test-ajf-formschema';

const url = `/forms/${formSchemas[0].id}/create`;

describe('dino-create-form', () => {
  beforeEach(() => cy.visit(url));

  it('should enter a create form page', () => {
    cy.get('dino-create-form').should('exist');
    cy.url().should('contain', 'create').should('contain', 'form');
  });

  it('should show a Metric selector', () => {
    cy.get('dino-form-metric-selector').should('exist');
  });
});
