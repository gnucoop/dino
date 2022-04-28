describe('dino forms collect', () => {
  beforeEach(() => cy.visit('/forms'));

  it('should display one or more Grid Tiles', () => {
    cy.get('dino-collect').should('exist');
    cy.get('mat-grid-tile').should('exist').should('have.length.gt', 0);
  });

  it('should enter a form list page', () => {
    cy.get('mat-grid-tile').should('exist').first().click();
    cy.get('dino-list').should('exist');
    cy.url().should('contain', 'forms');
  });
});

describe('dino reports collect', () => {
  beforeEach(() => cy.visit('/reports'));

  it('should display one or more Grid Tiles', () => {
    cy.get('dino-collect').should('exist');
    cy.get('mat-grid-tile').should('exist').should('have.length.gt', 0);
  });

  it('should enter a report list page', () => {
    cy.get('mat-grid-tile').should('exist').first().click();
    cy.get('dino-list').should('exist');
    cy.url().should('contain', 'reports');
  });
});
