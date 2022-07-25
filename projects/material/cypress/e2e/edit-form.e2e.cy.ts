import {formDatas} from '../../../e2e-app/src/test-ajf-formdata';

describe('dino-edit-form', () => {
  beforeEach(() => {
    cy.visit('/forms');
    cy.get('dino-collect').should('exist');
    cy.get('mat-grid-tile').should('exist').first().click();
  });

  it('should enter an edit form page', () => {
    cy.get('dino-list').should('exist');
    cy.get('mat-row:not(.dino-row-details)')
      .should('have.length', formDatas.length)
      .first()
      .invoke('addClass', 'dino-hover')
      .click();
    cy.get('mat-row .mat-cell.dino-row-actions .mat-icon.mat-list-icon')
      .first()
      .invoke('mouseover')
      .click();
    cy.get('dino-edit-form').should('exist');
    cy.url().should('contain', 'forms').should('contain', 'edit');
  });
});
