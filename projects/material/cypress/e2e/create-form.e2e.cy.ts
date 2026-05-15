describe('dino-create-form', {testIsolation: false}, () => {
  before(() => {
    cy.visit('/forms');
    cy.get('dino-collect').should('exist');
    cy.get('mat-grid-tile').should('exist').first().click();
    cy.get('dino-floating-button button').should('exist').first().click();
    cy.get('dino-create-form').should('exist');
  });

  it('should enter a create form page', () => {
    cy.get('dino-create-form').should('exist');
    cy.url().should('contain', 'create').should('contain', 'form');
  });

  it('should show a Metric selector', () => {
    cy.get('dino-form-metric-selector').should('exist');
  });

  it('should render a mat-stepper with two steps', () => {
    cy.get('mat-stepper').should('exist');
    cy.get('mat-step-header').should('have.length', 2);
  });

  it('should label the first step "FORM METRICS"', () => {
    cy.get('mat-step-header').first().should('contain.text', 'FORM METRICS');
  });

  it('should label the second step "FORM DATA"', () => {
    cy.get('mat-step-header').eq(1).should('contain.text', 'FORM DATA');
  });

  it('should have the first step active by default', () => {
    cy.get('mat-step-header').first().should('have.attr', 'aria-selected', 'true');
    cy.get('mat-step-header').eq(1).should('have.attr', 'aria-selected', 'false');
  });

  it('should show a creation date input in the metric selector', () => {
    cy.get('dino-form-metric-selector .dino-form-date-selector-field input').should('exist');
  });

  it('should show a Fill the Form button in the metric selector', () => {
    cy.get('.dino-go-to-data-button').first().should('exist').should('be.visible');
  });

  it('should render a save floating button', () => {
    cy.get('dino-floating-button[buttonicon="save"]').should('exist');
  });

  it('should have the save floating button disabled before form data is entered', () => {
    cy.get('dino-floating-button[buttonicon="save"] button').should('be.disabled');
  });

  // Step 2 tests — navigate forward via "Fill the Form" and stay there for subsequent tests

  it('should navigate to the form data step when clicking Fill the Form', () => {
    cy.get('.dino-go-to-data-button').first().should('not.be.disabled').click();
    cy.get('mat-step-header').eq(1).should('have.attr', 'aria-selected', 'true');
  });

  it('should render an ajf-form in the form data step', () => {
    cy.get('ajf-form').should('exist');
    cy.get('mat-radio-button').should('exist');
  });

  it('should show a back navigation button in the form data step', () => {
    cy.get('button[aria-label="Previous step"]').should('exist');
  });

  it('should keep the save floating button disabled when the form is empty', () => {
    cy.get('dino-floating-button[buttonicon="save"] button').should('be.disabled');
  });

  it('should return to the metrics step when clicking the back button', () => {
    cy.get('button[aria-label="Previous step"]').click({force: true});
    cy.get('mat-step-header').first().should('have.attr', 'aria-selected', 'true');
  });
});
