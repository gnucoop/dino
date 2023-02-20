import {formSchemas} from '../../../e2e-app/src/test-ajf-formschema';

const url = `/forms/${formSchemas[0].id}`;

const filterFieldCss = (field: string) => `.mat-input-element[formcontrolname="${field}"]`;
const filterFieldMdcCss = (field: string) => `.mat-mdc-input-element[formcontrolname="${field}"]`;

describe('dino-search-filters-bar', () => {
  beforeEach(() => cy.visit(url));

  it('should display a Filter Bar component and its filters', () => {
    cy.get('dino-search-filters-bar').should('be.visible');
    cy.get('.mat-expansion-indicator').should('be.visible').click();
    cy.get(filterFieldMdcCss('dateStart')).should('be.visible');
    cy.get(filterFieldMdcCss('dateEnd')).should('be.visible');
    cy.get(filterFieldMdcCss('keyword')).should('be.visible');
    cy.get('.dino-filters-dialog-button').should('be.visible');
  });

  it('should change the displayed rows and the url on toolbar filters keydown', () => {
    cy.url().then(initialUrl => {
      cy.get(filterFieldMdcCss('keyword')).should('be.visible').type('123456789');
      cy.get('.mat-mdc-header-row').should('exist');
      cy.url().should('not.eq', initialUrl).should('contain', '?filters=');
    });
  });

  it('should open the advanced filters dialog', () => {
    cy.get('dino-search-filters-dialog').should('not.exist');
    cy.get('.mat-expansion-indicator').click();
    cy.get('.dino-filters-dialog-button').click();
    cy.get('dino-search-filters-dialog').should('exist');
  });
});
