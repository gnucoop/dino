import {formDatas} from '../../../e2e-app/src/test-ajf-formdata';
import {formSchemas} from '../../../e2e-app/src/test-ajf-formschema';

const url = `/forms/${formSchemas[0].id}/edit/${formDatas[0].id}`;

describe('dino-breadcrumb', () => {
  beforeEach(() => cy.visit(url));

  it('should display the correct elements in Breadcrumbs', () => {
    cy.get('dino-breadcrumbs').should('exist').should('be.visible');
    cy.get('dino-breadcrumbs .mat-icon:contains("list_alt")').should('be.visible');
    cy.get('dino-breadcrumbs .mat-icon:contains("star")').should('be.visible');
    cy.get('dino-breadcrumbs .mat-icon:contains("navigate_next")')
      .should('be.visible')
      .should('have.length', 2);
    cy.get('dino-breadcrumbs span.dino-breadcrumb-current-route:contains("Edit")').should(
      'be.visible',
    );
  });
});
