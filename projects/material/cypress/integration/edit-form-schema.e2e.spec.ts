describe('dino-edit-form-schema', () => {
  beforeEach(() => {
    cy.visit('/forms');
    cy.get('mat-grid-tile')
      .should('exist')
      .first()
      .find('.dino-grid-action-icons button')
      .first()
      .click();
  });

  it('should enter an edit form schema page', () => {
    cy.get('dino-edit-form-schema').should('exist');
    cy.url().should('contain', 'forms').should('contain', 'schema').should('contain', 'edit');
  });

  it('should show an Ajf Form Builder', () => {
    cy.get('ajf-form-builder').should('exist');
  });

  it('should show a form with all Form Schema basic attributes inputs', () => {
    cy.get('.dino-form-attributes').should('be.visible');
  });
});

describe('dino-import-form-schema', () => {
  beforeEach(() => {
    cy.visit('/forms');
    cy.get('mat-grid-tile')
      .should('exist')
      .first()
      .find('.dino-grid-action-icons button')
      .first()
      .click();
    cy.get('dino-edit-form-schema').should('exist');
  });

  it('should show an Import button', () => {
    cy.get('.mat-button-wrapper:contains("Import")').should('exist');
  });

  it('should open the Import Form Schema dialog', () => {
    cy.get('.mat-button-wrapper:contains("Import")').click();
    cy.get('dino-import-form-schema').should('exist');
  });
});
