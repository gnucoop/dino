import {formSchemas} from '../../../dinoapp/src/testing/test-ajf-formschema';

const url = `/forms/schema/${formSchemas[0].id}/edit`;

describe('dino-edit-form-schema', () => {
  beforeEach(() => cy.visit(url));

  it('should show an Ajf Form Builder', () => {
    cy.get('ajf-form-builder').should('exist');
  });

  it('should show a form with all Form Schema basic attributes inputs', () => {
    cy.get('.dino-form-attributes').should('be.visible');
  });
});

describe('dino-import-form-schema', () => {
  beforeEach(() => cy.visit(url));

  it('should show an Import button', () => {
    cy.get('.mdc-button').contains('Import').should('exist');
  });

  it('should open the Import Form Schema dialog', () => {
    cy.get('.mdc-button').contains('Import').click();
    cy.get('dino-import-form-schema').should('exist');
  });
});
