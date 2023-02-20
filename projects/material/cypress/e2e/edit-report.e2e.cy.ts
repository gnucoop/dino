import {reportDatas} from '../../../e2e-app/src/test-ajf-reportdata';

describe('dino-edit-report', () => {
  beforeEach(() => cy.visit('/reports'));

  it('should enter a view report page', () => {
    cy.get('dino-collect').should('exist');
    cy.get('mat-grid-tile').should('exist').first().click();
    cy.get('dino-list').should('exist');
    cy.get('.mat-mdc-row:not(.dino-row-details)')
      .should('have.length', reportDatas.length)
      .first()
      .invoke('addClass', 'dino-hover')
      .click();

    cy.get('.mat-mdc-cell.dino-row-actions .mat-icon')
      .contains('visibility ')
      .first()
      .click({force: true});
    cy.get('dino-edit-report').should('exist');
    cy.url().should('contain', 'reports').should('contain', 'view');
  });
});
