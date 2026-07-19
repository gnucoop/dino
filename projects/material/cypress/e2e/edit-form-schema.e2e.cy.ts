import {formSchemas} from '../../../dinoapp/src/testing/test-ajf-formschema';

const url = `/forms/schema/${formSchemas[0].id}/edit`;

describe('dino-edit-form-schema', () => {
  beforeEach(() => cy.visit(url));

  it('should show the Settings, Build and Relationships tabs', () => {
    cy.get('.dino-efs-tabs .mat-mdc-tab').contains('Settings').should('exist');
    cy.get('.dino-efs-tabs .mat-mdc-tab').contains('Build').should('exist');
    cy.get('.dino-efs-tabs .mat-mdc-tab').contains('Relationships').should('exist');
  });

  it('should show an Ajf Form Builder in the Build tab', () => {
    cy.get('.dino-efs-tabs .mat-mdc-tab').contains('Build').click();
    cy.get('ajf-form-builder').should('exist');
  });

  it('should show a form with all Form Schema basic attributes inputs in the Settings tab', () => {
    cy.get('.dino-efs-tabs .mat-mdc-tab').contains('Settings').click();
    cy.get('.dino-form-attributes').should('be.visible');
  });

  it('should show the Save button on the tab row', () => {
    cy.get('.dino-efs-save').contains('Save').should('exist');
  });

  it('should show the relationships editor in the Relationships tab', () => {
    cy.get('.dino-efs-tabs .mat-mdc-tab').contains('Relationships').click();
    cy.get('dino-form-deps-editor').should('exist');
  });
});

describe('dino-import-form-schema', () => {
  beforeEach(() => cy.visit(url));

  it('should show an Import button in the Build toolbar', () => {
    cy.get('.dino-efs-tabs .mat-mdc-tab').contains('Build').click();
    cy.get('.ajf-formbuilder-toolbar .dino-efs-import-btn').contains('Import').should('exist');
  });

  it('should open the Create or import a form dialog', () => {
    cy.get('.dino-efs-tabs .mat-mdc-tab').contains('Build').click();
    cy.get('.ajf-formbuilder-toolbar .dino-efs-import-btn').contains('Import').click();
    cy.get('dino-import-form-schema').should('exist');
  });
});
