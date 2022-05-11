describe('dino-user-area', () => {
  beforeEach(() => cy.visit('/dashboard'));

  it('should open the user area dialog', () => {
    cy.get('.dino-active-user-icon').should('exist').click();
    cy.get('dino-user-area').should('exist');
  });
});
