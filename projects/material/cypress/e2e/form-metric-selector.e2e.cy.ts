import {formDatas} from '../../../e2e-app/src/test-ajf-formdata';
import {formSchemas} from '../../../e2e-app/src/test-ajf-formschema';

const url = `/forms/${formSchemas[0].id}/edit/${formDatas[0].id}`;

describe('dino-form-metric-selector', () => {
  beforeEach(() => cy.visit(url));

  it('should enter a form-metric-selector page', () => {
    cy.get('mat-stepper').should('exist');
    cy.get('.dino-edit-form-step-container').should('exist');
    cy.get('dino-form-metric-selector').should('exist');
    cy.url().should('contain', 'forms').should('contain', 'edit');
  });
});
