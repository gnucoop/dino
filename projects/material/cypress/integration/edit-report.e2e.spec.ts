import {reportDatas} from '../../../e2e-app/src/test-ajf-reportdata';

describe('dino-edit-report', () => {
  beforeEach(() => cy.visit('/reports'));

  it('should enter a view report page', () => {
    cy.get('dino-collect').should('exist');
    cy.get('mat-grid-tile').should('exist').first().click();
    cy.get('dino-list').should('exist');
    cy.get('mat-row:not(.dino-row-details)')
      .should('have.length', reportDatas.length)
      .first()
      .invoke('addClass', 'dino-hover');
    cy.get('mat-row .mat-cell.dino-row-actions .mat-icon.mat-list-icon')
      .first()
      .invoke('mouseover')
      .next()
      .invoke('mouseover')
      .click();
    cy.get('dino-edit-report').should('exist');
    cy.url().should('contain', 'reports').should('contain', 'view');
  });
});
