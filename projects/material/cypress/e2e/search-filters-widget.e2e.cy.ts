import {openFirstFormList} from '../support/navigation';

/**
 * Opens the search filters dialog on the list of the first form schema.
 *
 * Every test starts from a fresh page. The widgets keep the value and the
 * operator they were given in the FiltersService, and creating a filter makes
 * the dialog rebuild all of them, so a dialog shared across tests
 * (testIsolation: false) left each test at the mercy of what the previous ones
 * had typed or toggled: the spec used to fail on a different test depending on
 * the timing of the run.
 */
const openFiltersDialog = () => {
  openFirstFormList();
  cy.get('.mat-expansion-indicator').click();
  cy.get('.dino-filters-dialog-button').should('be.visible').click();
  cy.get('dino-search-filters-dialog').should('exist');
};

describe('dino-search-filters-widget', () => {
  beforeEach(openFiltersDialog);

  it('should display a number of dino-search-filters-widget components', () => {
    cy.get('dino-search-filters-widget').should('have.length.gt', 0);
  });

  it('should display a create filter button in disabled state', () => {
    cy.get('.mat-mdc-card-actions .dino-create-filter-button')
      .first()
      .should('be.visible')
      .should('be.disabled');
  });

  it('should display a mat-input', () => {
    cy.get('.mat-mdc-card-content input').should('be.visible');
  });

  it('should render a non-empty label for each widget', () => {
    cy.get('dino-search-filters-widget .dino-filter-widget-label')
      .should('have.length.gt', 0)
      .each($label => {
        cy.wrap($label).invoke('text').invoke('trim').should('not.be.empty');
      });
  });

  it('should display operator toggle buttons for widgets that support them', () => {
    cy.get('dino-search-filters-widget')
      .filter(':has(mat-button-toggle-group)')
      .first()
      .within(() => {
        cy.get('mat-button-toggle').should('have.length.gt', 1);
      });
  });

  it('should pre-select the default operator', () => {
    cy.get('dino-search-filters-widget')
      .filter(':has(mat-button-toggle-group)')
      .first()
      .within(() => {
        cy.get('mat-button-toggle.mat-button-toggle-checked').should('exist');
      });
  });

  it('should enable the create filter button after typing a value', () => {
    cy.get('dino-search-filters-widget')
      .filter(':has(.mat-mdc-text-field-wrapper)')
      .first()
      .within(() => {
        cy.get('input').type('test', {force: true}).should('have.value', 'test');
        cy.get('.dino-create-filter-button').should('not.be.disabled');
      });
  });

  it('should enable the create filter button when a null operator is selected', () => {
    cy.get('dino-search-filters-widget')
      .filter(':has(mat-button-toggle-group)')
      .first()
      .within(() => {
        cy.get('mat-button-toggle').contains('Empty').scrollIntoView().click();
        cy.get('.dino-create-filter-button').should('not.be.disabled');
      });
  });

  it('should update the checked operator toggle on selection', () => {
    cy.get('dino-search-filters-widget')
      .filter(':has(mat-button-toggle-group)')
      .first()
      .within(() => {
        cy.get('mat-button-toggle').contains('Is').scrollIntoView().click();
        cy.get('mat-button-toggle.mat-button-toggle-checked').should('contain.text', 'Is');
      });
  });

  it('should reset the input value after creating a filter', () => {
    cy.get('dino-search-filters-widget')
      .filter(':has(.mat-mdc-text-field-wrapper)')
      .first()
      .within(() => {
        cy.get('input').type('reset test', {force: true}).should('have.value', 'reset test');
        cy.get('.dino-create-filter-button').should('not.be.disabled').click({force: true});
        cy.get('input').should('have.value', '');
      });
  });
});
