describe('dino-search-filters-widget', {testIsolation: false}, () => {
  before(() => {
    cy.visit('/forms');
    cy.get('dino-collect').should('exist');
    cy.get('mat-grid-tile').should('exist').first().click();
    cy.get('.mat-expansion-indicator').click();
  });

  beforeEach(() => {
    cy.get('.dino-filters-dialog-button').should('be.visible').click();
    cy.get('dino-search-filters-dialog').should('exist');
  });

  afterEach(() => {
    cy.get('body').then($body => {
      if ($body.find('dino-search-filters-dialog').length > 0) {
        cy.get('.mat-mdc-raised-button:contains("Close")').click({force: true});
        cy.get('dino-search-filters-dialog').should('not.exist');
      }
    });
  });

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
        cy.get('input').type('test');
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
        cy.get('input').type('reset test');
        cy.get('.dino-create-filter-button').should('not.be.disabled').click();
        cy.get('input').should('have.value', '');
      });
  });
});
