import {formSchemas} from '../../../dinoapp/src/testing/test-ajf-formschema';

const url = `/forms/schema/${formSchemas[0].id}/edit`;

describe('dino-edit-form-schema', () => {
  beforeEach(() => cy.visit(url));

  it('should show the Settings and Build tabs', () => {
    cy.get('.dino-efs-tabs .mat-mdc-tab').contains('Settings').should('exist');
    cy.get('.dino-efs-tabs .mat-mdc-tab').contains('Build').should('exist');
  });

  it('should show an Ajf Form Builder in the Build tab', () => {
    cy.get('.dino-efs-tabs .mat-mdc-tab').contains('Build').click();
    cy.get('ajf-form-builder').should('exist');
  });

  it('should show a form with all Form Schema basic attributes inputs in the Settings tab', () => {
    cy.get('.dino-efs-tabs .mat-mdc-tab').contains('Settings').click();
    cy.get('.dino-form-attributes').should('be.visible');
  });
});

describe('dino-import-form-schema', () => {
  beforeEach(() => cy.visit(url));

  it('should show an Import button', () => {
    cy.get('.dino-efs-actions .mdc-button').contains('Import').should('exist');
  });

  it('should open the Create or import a form dialog', () => {
    cy.get('.dino-efs-actions .mdc-button').contains('Import').click();
    cy.get('dino-import-form-schema').should('exist');
  });
});
