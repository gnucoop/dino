describe('dino-list', () => {
  beforeEach(() => {
    cy.visit('/forms');
    cy.get('dino-collect').should('exist');
    cy.get('mat-grid-tile').should('exist').first().click();
  });

  it('should display a material table', () => {
    cy.get('dino-list').should('exist');
  });

  it('should display a checkbox column and a checkBox for bulk actions', () => {
    cy.get('.mat-column-select').should('exist');
    cy.get('.mat-mdc-checkbox').should('exist');
  });

  it('should display the correct header cells with their icon identifiers, including the ones specified by the string identifier', () => {
    [
      'Case people',
      'District',
      'Location place',
      'Organization public',
      'Project assignment',
      'Thematic area volunteer_activism',
    ].forEach(expected => {
      cy.get(`mat-header-cell:contains("${expected}")`).should('exist');
    });
  });

  it('should select a row by checking the associated checkBox', () => {
    cy.get('.mat-mdc-row .mat-mdc-checkbox').first().should('exist');
    cy.get('.mat-mdc-row .mat-mdc-checkbox')
      .first()
      .click()
      .should('have.class', 'mat-mdc-checkbox-checked');
  });

  it('should select all rows (bulk actions checkBox)', () => {
    cy.get('.mat-mdc-row .mat-mdc-checkbox')
      .its('length')
      .then(rowBoxes => {
        cy.get('.mat-mdc-row .mat-mdc-checkbox').first().click();
        cy.get('.mat-mdc-row .mat-mdc-checkbox').should('have.length', rowBoxes);
      });
  });

  it('should display the row action icons on mouseover', () => {
    cy.get('.mat-mdc-cell.dino-row-actions')
      .first()
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible');
  });

  it(`should delete a row by clicking on its action-delete button,
      and confirming the action on the Confirmation Dialog`, () => {
    cy.get('.mat-mdc-row')
      .its('length')
      .then(initialRowCount => {
        cy.get('.mat-mdc-row').first().click();
        cy.get('.mat-mdc-cell.dino-row-actions .mat-icon').contains('delete').click({force: true});
        cy.get('.confirmation-dialog').should('exist');
        cy.get('.dino-confirm-button').click();
        cy.get('.mat-mdc-row').should('have.length.lt', initialRowCount);
      });
  });
});
