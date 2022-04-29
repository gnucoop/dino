import {reportSchemas} from '../../../e2e-app/src/test-ajf-reportschema';

const url = `/reports/${reportSchemas[0].id}/create`;

describe('dino-create-report', () => {
  beforeEach(() => cy.visit(url));

  it('should enter a create report page', async () => {
    cy.get('dino-create-report').should('exist');
    cy.url().should('contain', 'create').should('contain', 'report');
  });
});
