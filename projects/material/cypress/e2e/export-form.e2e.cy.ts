import {join} from 'path';

import {formSchemas} from '../../../e2e-app/src/test-ajf-formschema';

const projectFilterJson = [
  {
    name: 'project',
    value: 'PRO',
    operator: {label: 'Like', value: '$regex'},
    fieldType: 0,
  },
];
const projectFilter = btoa(encodeURI(JSON.stringify(projectFilterJson)));
const baseUrl = `/forms/${formSchemas[0].id}?filters=${projectFilter}`;

describe('dino-export-form', () => {
  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it('should export filtered data in xlsx', () => {
    cy.get('.mat-expansion-indicator').click();
    cy.get('.dino-export-button').click();
    cy.get('.mat-list-item:contains("XLSX")').click();
    cy.get('.mat-flat-button:contains("Export")').click();
    // const downloadsFolder = Cypress.config('downloadsFolder');
    // cy.readFile(join(downloadsFolder, 'cbm.xls'));
  });
});
