import {openFirstFormList} from '../support/navigation';

const filtersPreset = {
  filters: [
    {
      'name': 'keyword',
      'value': 't',
      'operator': {'label': 'Like', 'value': '$regex'},
      'fieldType': 0,
    },
  ],
  additionalFiltersLogic: 'and',
};
const presetValue = btoa(encodeURI(JSON.stringify(filtersPreset)));

/** The preset manager lives in the first tab of the Filters modal. */
const openFiltersModal = () => {
  cy.get('.dino-filters-dialog-button').should('be.visible').click();
  cy.get('.dino-filters-modal').should('be.visible');
};

/**
 * Applies one filter through the advanced tab and closes the modal with it.
 * The form list turns the keyword field off, so this is the way left to put a
 * filter in the url without typing a date.
 */
const applyOneAdvancedFilter = () => {
  cy.get('.dino-filters-modal-tabs mat-button-toggle[value="advanced"]').click();
  cy.get('.dino-filters-advanced').should('be.visible');
  // Scoped to the advanced tab: the simple one stays in the DOM, only hidden.
  cy.get('.dino-filters-advanced .mat-mdc-card-content .mat-mdc-radio-button .mdc-form-field')
    .eq(1)
    .click();
  cy.get('.dino-filters-advanced .mat-mdc-card-actions .dino-create-filter-button').first().click();
  // The chip is the proof the filter was staged: searching before it appears
  // closes the modal with nothing to apply.
  cy.get('.mat-mdc-chip').should('exist');
  cy.get('.dino-filters-modal-actions button:contains("Search")').click();
  cy.get('.dino-filters-modal').should('not.exist');
};

describe('dino-search-filters-preset-manager', () => {
  beforeEach(() => {
    openFirstFormList();
    openFiltersModal();
    cy.get('dino-search-filters-preset-manager').should('exist');
    localStorage.setItem('filters_preset_custom_load', presetValue);
  });

  afterEach(() => {
    localStorage.removeItem('filters_preset_custom_load');
  });

  it('should display a dino-search-filters-preset-manager component', () => {
    cy.get('dino-search-filters-preset-manager').should('be.visible');
  });

  it('should disable apply/save buttons if preset is not valid or stored ', () => {
    cy.get('dino-search-filters-preset-manager input').should('be.visible').type('test_preset');
    cy.get('dino-search-filters-preset-manager button').first().should('be.disabled');
    cy.get('dino-search-filters-preset-manager button').last().should('be.disabled');
  });

  it('should save or update a preset in the localStorage', () => {
    expect(localStorage.getItem('filters_preset_custom')).to.be.null;
    applyOneAdvancedFilter();
    cy.url().should('contain', '?filters=');
    openFiltersModal();
    cy.get('dino-search-filters-preset-manager input').type('custom');
    cy.get('dino-search-filters-preset-manager button')
      .last()
      .should('not.be.disabled')
      .click()
      .then(() => {
        expect(localStorage.getItem('filters_preset_custom')).not.to.be.null;
        localStorage.removeItem('filters_preset_custom');
      });
  });

  it('should load a preset from the localStorage', () => {
    cy.url().should('not.contain', '?filters=');
    cy.get('dino-search-filters-preset-manager button').first().should('be.disabled');
    cy.get('dino-search-filters-preset-manager input').should('have.value', '').type('c');
    cy.get('.mat-mdc-autocomplete-panel').should('be.visible');
    cy.get('.mat-mdc-autocomplete-panel .mat-mdc-option')
      .first()
      .should('contain.text', 'custom_load')
      .click();
    cy.get('dino-search-filters-preset-manager input').should('have.value', 'custom_load');
    cy.get('dino-search-filters-preset-manager button').first().should('not.be.disabled').click();
    // The preset carries a keyword filter, and this list does not display the
    // keyword field: the url is what tells that the preset was applied.
    cy.url().should('contain', '?filters=');
  });
});
