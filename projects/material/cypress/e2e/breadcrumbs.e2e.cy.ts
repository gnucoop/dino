describe('dino-breadcrumb', () => {
  beforeEach(() => {
    cy.visit('/forms');
    cy.get('dino-collect').should('exist');
    cy.get('mat-grid-tile').should('exist').first().click();
    cy.get('.mat-mdc-row:not(.dino-row-details)').first().invoke('addClass', 'dino-hover').click();
    cy.get('.mat-mdc-cell.dino-row-actions .mat-icon')
      .contains('create ')
      .first()
      .click({force: true});
  });

  it('should display the correct elements in Breadcrumbs', () => {
    cy.get('dino-breadcrumbs').should('exist').should('be.visible');
    // The ancestors are the page overline: plain text segments divided by a slash.
    // Forms > the form schema, with the current route left out of the trail.
    cy.get('dino-breadcrumbs .dino-page-overline-segment').should('have.length', 2);
    cy.get('dino-breadcrumbs .dino-page-overline-segment').first().should('contain', 'Forms');
    cy.get('dino-breadcrumbs .dino-page-overline-separator').should('have.length', 1);
    // The last crumb is the page title, and carries an icon only when the route
    // declares one: the Edit route does not.
    cy.get('dino-breadcrumbs h1.dino-page-title').should('be.visible').should('contain', 'Edit');
    cy.get('dino-breadcrumbs .dino-page-title-icon').should('not.exist');
  });
});
