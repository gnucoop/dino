describe('dino-form-metric-selector', {testIsolation: false}, () => {
  before(() => {
    cy.visit('/forms');
    cy.get('dino-collect').should('exist');
    cy.get('mat-grid-tile').should('exist').first().click();
    cy.get('.mat-mdc-row:not(.dino-row-details)').first().invoke('addClass', 'dino-hover').click();
    cy.get('.mat-mdc-cell.dino-row-actions .mat-icon')
      .contains('create ')
      .first()
      .click({force: true});
  });

  it('should enter a form-metric-selector page', () => {
    cy.get('mat-stepper').should('exist');
    cy.get('.dino-edit-form-step-container').should('exist');
    cy.get('dino-form-metric-selector').should('exist');
    cy.url().should('contain', 'forms').should('contain', 'edit');
  });

  it('should render a mat-stepper with two steps', () => {
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

  it('should show a creation date input', () => {
    cy.get('dino-form-metric-selector .dino-form-date-selector-field input').should('exist');
  });

  it('should show a datepicker toggle button', () => {
    cy.get('dino-form-metric-selector mat-datepicker-toggle button').should('exist');
  });

  it('should open a calendar panel when clicking the datepicker toggle', () => {
    cy.get('dino-form-metric-selector mat-datepicker-toggle button').first().click();
    cy.get('mat-datepicker-content').should('be.visible');
    cy.get('mat-calendar').should('exist');
    cy.get('mat-datepicker-toggle button').first().click();
  });

  it('should show at least one metric autocomplete field', () => {
    cy.get('dino-form-metric-selector .dino-form-metric-selector-field').should('exist');
  });

  it('should show a Fill the Form button', () => {
    cy.get('.dino-go-to-data-button').first().should('exist').should('be.visible');
  });

  it('should render a save floating button', () => {
    cy.get('dino-floating-button[buttonicon="save"]').should('exist');
  });

  // Step 2 tests — navigate forward and stay there for subsequent tests

  it('should navigate to the form data step when clicking Fill the Form', () => {
    cy.get('.dino-go-to-data-button').first().should('not.be.disabled').click();
    cy.get('mat-step-header').eq(1).should('have.attr', 'aria-selected', 'true');
  });

  it('should render an ajf-form in the form data step', () => {
    cy.get('ajf-form').should('exist');
  });

  it('should show a back navigation button in the form data step', () => {
    cy.get('button[aria-label="Previous step"]').should('exist');
  });

  it('should return to the metrics step when clicking the back button', () => {
    cy.get('button[aria-label="Previous step"]').click({force: true});
    cy.get('mat-step-header').first().should('have.attr', 'aria-selected', 'true');
  });
});
