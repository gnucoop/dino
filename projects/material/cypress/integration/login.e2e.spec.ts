describe('dino-material-login', () => {
  beforeEach(() => cy.visit('/login'));

  it('should not display an error message on init', () => {
    cy.get('.dino-error-message').should('not.exist');
  });

  it('should disable the login button if the form value is invalid', () => {
    cy.get('.mat-fab').should('exist');
    cy.get('form').find('.mat-fab').should('exist');
    cy.get('form').find('input[name="email"]').should('exist').clear();
    cy.get('form').find('input[name="password"]').should('exist').clear();
    cy.get('form').find('.mat-fab').should('not.be.enabled');
  });

  it('should enable the login button if the form value is valid', () => {
    cy.get('.mat-fab').should('exist');
    cy.get('form').find('.mat-fab').should('exist');
    cy.get('form').find('input[name="email"]').should('exist').type('email@email.io');
    cy.get('form').find('input[name="password"]').should('exist').type('password');
    cy.get('form').find('.mat-fab').should('be.enabled');
  });

  it('should show the error message if login was unsuccessful', () => {
    cy.get('.mat-fab').should('exist');
    cy.get('form').find('.mat-fab').should('exist');
    cy.get('form').find('input[name="email"]').should('exist').type('wrong@email.io');
    cy.get('form').find('input[name="password"]').should('exist').type('wrongpass');
    cy.get('form').find('.mat-fab').click();
    cy.get('.dino-error-message').should('be.visible');
  });
});
