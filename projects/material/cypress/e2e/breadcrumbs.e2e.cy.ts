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
    cy.get('dino-breadcrumbs .mat-icon:contains("list_alt")').should('be.visible');
    cy.get('dino-breadcrumbs .mat-icon:contains("remove_red_eye")').should('be.visible');
    cy.get('dino-breadcrumbs .mat-icon:contains("navigate_next")')
      .should('be.visible')
      .should('have.length', 2);
    cy.get('dino-breadcrumbs span.dino-breadcrumb-current-route:contains("Edit")').should(
      'be.visible',
    );
  });
});
