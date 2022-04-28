describe('dino-breadcrumb  s', () => {
  beforeEach(() => cy.visit('/forms'));

  it('should display the correct elements in Breadcrumbs', () => {
    cy.get('dino-collect').should('exist');
    cy.get('mat-grid-tile').should('exist').first().click();
    cy.get('dino-list').should('exist');
    cy.get('mat-row').should('exist').first().click();
    cy.get('.mat-cell.dino-row-actions .mat-icon.mat-list-icon')
      .first()
      .should('be.visible')
      .click();
    cy.get('dino-edit-form').should('exist');
    cy.get('dino-breadcrumbs').should('exist').should('be.visible');
    cy.get('dino-breadcrumbs .mat-icon:contains("list_alt")').should('be.visible');
    cy.get('dino-breadcrumbs .mat-icon:contains("star")').should('be.visible');
    cy.get('dino-breadcrumbs .mat-icon:contains("navigate_next")')
      .should('be.visible')
      .should('have.length', 2);
    cy.get('dino-breadcrumbs span.dino-breadcrumb-current-route:contains("Edit")').should(
      'be.visible',
    );
  });
});
