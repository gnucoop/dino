/**
 * Opens the Form Schema editor on the first seeded schema.
 *
 * The editor is reached the way a user reaches it, with "Edit Schema" on the
 * forms page, and not by building the url from the fixture: the seed ids never
 * make it into the database, because DataService assigns a fresh uuid to every
 * inserted document. Visiting `/forms/schema/<seed id>/edit` opens the editor on
 * a schema that does not exist, which leaves it in creation mode — an empty
 * builder, the relationship sections locked and the Relationships tab disabled.
 */
const openSchemaEditor = () => {
  cy.visit('/forms');
  cy.get('button[aria-label="Edit Schema"]').first().click();
  cy.get('dino-edit-form-schema').should('exist');
  cy.url().should('contain', '/forms/schema/').should('contain', '/edit');
};

/** Tab labels in display order — mirrors the EditorTab enum in edit-form-schema.ts. */
const TABS = ['Settings', 'Metrics', 'Status', 'Build', 'Relationships'];

/** Selects a tab by name, by position, so the order itself stays asserted. */
const tab = (name: string) => cy.get('.dino-efs-tabs .mat-mdc-tab').eq(TABS.indexOf(name));

describe('dino-edit-form-schema', () => {
  beforeEach(openSchemaEditor);

  it('should show the Settings, Metrics, Status, Build and Relationships tabs in order', () => {
    cy.get('.dino-efs-tabs .mat-mdc-tab').should('have.length', TABS.length);
    TABS.forEach((label, i) =>
      cy.get('.dino-efs-tabs .mat-mdc-tab').eq(i).should('contain.text', label),
    );
  });

  it('should show an Ajf Form Builder in the Build tab', () => {
    tab('Build').click();
    cy.get('ajf-form-builder').should('exist');
  });

  it('should show a form with all Form Schema basic attributes inputs in the Settings tab', () => {
    tab('Settings').click();
    cy.get('.dino-efs-settings .dino-form-attributes').should('be.visible');
  });

  it('should show the Save button on the tab row', () => {
    cy.get('.dino-efs-save').contains('Save').should('exist');
  });

  it('should show the metrics fields and the metric deps sections in the Metrics tab', () => {
    tab('Metrics').click();
    cy.get('.dino-efs-metrics .dino-form-attributes').should('be.visible');
    // Projected from the headless deps editor: "Metrics to include in the form" and
    // "Metrics included as choice options".
    cy.get('.dino-efs-metrics .dino-deps .dino-deps-metrics-select').should('be.visible');
    cy.get('.dino-efs-metrics .dino-deps .deps-metrics-table').should('exist');
  });

  it('should show the Form Statuses field in the Status tab', () => {
    tab('Status').click();
    cy.get('.dino-efs-status [formcontrolname="status"]').should('exist');
  });

  it('should show only the form relationships section in the Relationships tab', () => {
    tab('Relationships').click();
    cy.get('.dino-efs-relations .dino-deps .deps-table').should('be.visible');
    // The metric sections moved to the Metrics tab.
    cy.get('.dino-efs-relations .dino-deps-metrics-select').should('not.exist');
  });
});

describe('dino-import-form-schema', () => {
  beforeEach(openSchemaEditor);

  it('should show an Import button in the Settings footer', () => {
    tab('Settings').click();
    cy.get('.dino-efs-settings-footer button').contains('Import').should('exist');
  });

  it('should open the Create or import a form dialog', () => {
    tab('Settings').click();
    cy.get('.dino-efs-settings-footer button').contains('Import').click();
    cy.get('dino-import-form-schema').should('exist');
  });
});
