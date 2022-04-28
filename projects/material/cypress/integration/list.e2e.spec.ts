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
    cy.get('.mat-checkbox').should('exist');
  });

  it('should display the correct header cells with their icon identifiers, including the ones specified by the string identifier', () => {
    const headers = cy.get('mat-header-cell').first();

    // await browser.wait(EC.presenceOf(element(by.tagName('mat-header-cell'))));
    [
      'Case people',
      'District',
      'Location place',
      'Organization public',
      'Project assignment',
      'Thematic area volunteer_activism',
    ].forEach(expected => {
      headers.next().should('contain.text', expected);
    });
  });

  it('should select a row by checking the associated checkBox', () => {
    cy.get('.mat-row .mat-checkbox').first().click().should('have.class', 'mat-checkbox-checked');
  });

  it('should select all rows (bulk actions checkBox)', () => {
    cy.get('.mat-row .mat-checkbox')
      .its('length')
      .then(rowBoxes => {
        cy.get('.mat-row .mat-checkbox').first().click();
        cy.get('.mat-row .mat-checkbox').should('have.length', rowBoxes);
      });
  });

  it('should display the row action icons on mouseover', () => {
    cy.get('.mat-row').first().click();
    cy.get('.mat-column-actions')
      .should('be.visible')
      .find('mat-icon')
      .first()
      .should('be.visible');
  });

  it(`should delete a row by clicking on its action-delete button,
      and confirming the action on the Confirmation Dialog`, () => {
    cy.get('.mat-row')
      .its('length')
      .then(initialRowCount => {
        cy.get('.mat-select-min-line').should('be.visible');
        cy.get('.mat-row').first().click();
        cy.get('.mat-cell.dino-row-actions .mat-icon.mat-list-icon')
          .should('be.visible')
          .first()
          .next()
          .click();
        cy.get('.confirmation-dialog').should('exist');
        cy.get('.dino-confirm-button').click();
        cy.get('.mat-row').should('have.length.lt', initialRowCount);
      });
  });
});
