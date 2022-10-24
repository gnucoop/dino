import {formSchemas} from '../../../e2e-app/src/test-ajf-formschema';

const url = `/forms/${formSchemas[0].id}`;

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

describe('dino-search-filters-preset-manager', () => {
  beforeEach(() => {
    cy.visit(url);
    cy.get('.mat-expansion-indicator').click();
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
    cy.get('input[formcontrolname="keyword"]').type('t');
    cy.url().should('contain', '?filters=');
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
    cy.get('.mat-autocomplete-panel').should('be.visible');
    cy.get('.mat-autocomplete-panel mat-option')
      .first()
      .should('contain.text', 'custom_load')
      .click();
    cy.get('dino-search-filters-preset-manager input').should('have.value', 'custom_load');
    cy.get('dino-search-filters-preset-manager button').first().should('not.be.disabled').click();
    cy.url().should('contain', '?filters=');
    cy.get('input[formcontrolname="keyword"]').should('be.visible').should('have.value', 't');
  });
});
