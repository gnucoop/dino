describe('dino forms collect', {retries: {runMode: 1, openMode: 0}}, () => {
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

  it('should enter an edit form schema page', () => {
    cy.get('mat-grid-tile')
      .should('exist')
      .first()
      .find('.dino-grid-action-icons button')
      .first()
      .click();
    cy.get('dino-edit-form-schema').should('exist');
    cy.url().should('contain', 'forms').should('contain', 'schema').should('contain', 'edit');
  });
});

describe('dino reports collect', {retries: {runMode: 1, openMode: 0}}, () => {
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

  it('should enter an edit form schema page', () => {
    cy.get('mat-grid-tile')
      .should('exist')
      .first()
      .find('.dino-grid-action-icons button')
      .first()
      .click();
    cy.get('dino-edit-report-schema').should('exist');
    cy.url().should('contain', 'reports').should('contain', 'schema').should('contain', 'edit');
  });
});

// --- Forms collect: filter bar ---

describe('dino forms collect - filter bar', {testIsolation: false}, () => {
  before(() => {
    cy.visit('/forms');
    cy.get('dino-collect').should('exist');
    cy.get('mat-grid-tile').should('have.length.gt', 0);
  });

  it('should show a filter bar with an input', () => {
    cy.get('dino-collect mat-form-field').should('exist');
    cy.get('dino-collect mat-form-field input').should('exist');
  });

  it('should show a filter_alt icon in the filter bar', () => {
    cy.get('dino-collect mat-form-field mat-icon').should('contain.text', 'filter_alt');
  });

  it('should hide grid tiles when the filter matches nothing', () => {
    cy.get('dino-collect mat-form-field input').type('zzzzzzzzz');
    cy.get('.dino-no-items-message').should('exist');
    cy.get('mat-grid-tile').should('have.length', 0);
  });

  it('should restore grid tiles after clearing the filter', () => {
    cy.get('dino-collect mat-form-field input').clear();
    cy.get('mat-grid-tile').should('have.length.gt', 0);
    cy.get('.dino-no-items-message').should('not.exist');
  });
});

// --- Reports collect: filter bar ---

describe('dino reports collect - filter bar', {testIsolation: false}, () => {
  before(() => {
    cy.visit('/reports');
    cy.get('dino-collect').should('exist');
    cy.get('mat-grid-tile').should('have.length.gt', 0);
  });

  it('should show a filter bar with an input', () => {
    cy.get('dino-collect mat-form-field').should('exist');
    cy.get('dino-collect mat-form-field input').should('exist');
  });

  it('should hide grid tiles when the filter matches nothing', () => {
    cy.get('dino-collect mat-form-field input').type('zzzzzzzzz');
    cy.get('.dino-no-items-message').should('exist');
    cy.get('mat-grid-tile').should('have.length', 0);
  });

  it('should restore grid tiles after clearing the filter', () => {
    cy.get('dino-collect mat-form-field input').clear();
    cy.get('mat-grid-tile').should('have.length.gt', 0);
  });
});

// --- Forms collect: tile content ---

describe('dino forms collect - tile content', {retries: {runMode: 1, openMode: 0}}, () => {
  beforeEach(() => cy.visit('/forms'));

  it('should display a label inside each grid tile', () => {
    cy.get('mat-grid-tile .dino-grid-label').first().should('exist').invoke('text').should('not.be.empty');
  });

  it('should display an icon inside each grid tile', () => {
    cy.get('mat-grid-tile .dino-grid-icon mat-icon').first().should('exist');
  });
});

// --- Reports collect: tile content ---

describe('dino reports collect - tile content', {retries: {runMode: 1, openMode: 0}}, () => {
  beforeEach(() => cy.visit('/reports'));

  it('should display a label inside each grid tile', () => {
    cy.get('mat-grid-tile .dino-grid-label').first().should('exist').invoke('text').should('not.be.empty');
  });

  it('should display an icon inside each grid tile', () => {
    cy.get('mat-grid-tile .dino-grid-icon mat-icon').first().should('exist');
  });
});

// --- Forms collect: action buttons ---

describe('dino forms collect - action buttons', {retries: {runMode: 1, openMode: 0}}, () => {
  beforeEach(() => cy.visit('/forms'));

  it('should show an edit schema button with the "create" icon', () => {
    cy.get('mat-grid-tile .dino-grid-action-icons button[aria-label="Edit Schema"]')
      .first()
      .should('exist');
    cy.get('mat-grid-tile .dino-grid-action-icons button[aria-label="Edit Schema"] mat-icon')
      .first()
      .should('contain.text', 'create');
  });

  it('should show a delete button with the "delete" icon', () => {
    cy.get('mat-grid-tile .dino-grid-action-icons button[aria-label="Delete Form Schema"]')
      .first()
      .should('exist');
    cy.get('mat-grid-tile .dino-grid-action-icons button[aria-label="Delete Form Schema"] mat-icon')
      .first()
      .should('contain.text', 'delete');
  });

  it('should show a chat with your data button with the "smart_toy" icon', () => {
    cy.get('mat-grid-tile .dino-grid-action-icons button[aria-label="Chat with your data"]')
      .first()
      .should('exist');
    cy.get(
      'mat-grid-tile .dino-grid-action-icons button[aria-label="Chat with your data"] mat-icon',
    )
      .first()
      .should('contain.text', 'smart_toy');
  });
});

// --- Reports collect: action buttons ---

describe('dino reports collect - action buttons', {retries: {runMode: 1, openMode: 0}}, () => {
  beforeEach(() => cy.visit('/reports'));

  it('should show an edit schema button with the "create" icon', () => {
    cy.get('mat-grid-tile .dino-grid-action-icons button[aria-label="Edit Schema"]')
      .first()
      .should('exist');
    cy.get('mat-grid-tile .dino-grid-action-icons button[aria-label="Edit Schema"] mat-icon')
      .first()
      .should('contain.text', 'create');
  });

  it('should show a delete button with the "delete" icon', () => {
    // aria-label is hardcoded to "Delete Form Schema" in the shared template for both types
    cy.get('mat-grid-tile .dino-grid-action-icons button[aria-label="Delete Form Schema"]')
      .first()
      .should('exist');
    cy.get(
      'mat-grid-tile .dino-grid-action-icons button[aria-label="Delete Form Schema"] mat-icon',
    )
      .first()
      .should('contain.text', 'delete');
  });
});

// --- Forms collect: delete schema dialog ---

describe('dino forms collect - delete schema dialog', {testIsolation: false}, () => {
  before(() => {
    cy.visit('/forms');
    cy.get('dino-collect').should('exist');
    cy.get('mat-grid-tile').should('have.length.gt', 0);
    cy.get('mat-grid-tile .dino-grid-action-icons button[aria-label="Delete Form Schema"]')
      .first()
      .click({force: true});
    cy.get('mat-dialog-container').should('exist');
  });

  it('should display a dialog title', () => {
    cy.get('mat-dialog-container h4[mat-dialog-title]').should('exist').invoke('text').should('not.be.empty');
  });

  it('should show a close/cancel button', () => {
    cy.get('.dino-cancel-button').should('exist');
  });

  it('should close the dialog when clicking the close button', () => {
    cy.get('.dino-cancel-button').click();
    cy.get('mat-dialog-container').should('not.exist');
    cy.get('mat-grid-tile').should('have.length.gt', 0);
  });
});

// --- Reports collect: delete schema dialog ---

describe('dino reports collect - delete schema dialog', {testIsolation: false}, () => {
  before(() => {
    cy.visit('/reports');
    cy.get('dino-collect').should('exist');
    cy.get('mat-grid-tile').should('have.length.gt', 0);
    // aria-label is hardcoded to "Delete Form Schema" in the shared template for both types
    cy.get('mat-grid-tile .dino-grid-action-icons button[aria-label="Delete Form Schema"]')
      .first()
      .click({force: true});
    cy.get('mat-dialog-container').should('exist');
  });

  it('should show a close/cancel button', () => {
    cy.get('.dino-cancel-button').should('exist');
  });

  it('should close the dialog when clicking the close button', () => {
    cy.get('.dino-cancel-button').click();
    cy.get('mat-dialog-container').should('not.exist');
    cy.get('mat-grid-tile').should('have.length.gt', 0);
  });
});

// --- Forms collect: add schema ---

describe('dino forms collect - add schema', {testIsolation: false}, () => {
  before(() => {
    cy.visit('/forms');
    cy.get('dino-collect').should('exist');
    cy.get('mat-grid-tile').should('have.length.gt', 0);
  });

  it('should show a floating add button', () => {
    cy.get('dino-floating-button').should('exist');
  });

  it('should navigate to the form schema create page when clicking the add button', () => {
    cy.get('dino-floating-button button').click();
    cy.url()
      .should('contain', 'forms')
      .should('contain', 'schema')
      .should('contain', 'create');
  });
});

// --- Reports collect: add schema ---

describe('dino reports collect - add schema', {testIsolation: false}, () => {
  before(() => {
    cy.visit('/reports');
    cy.get('dino-collect').should('exist');
    cy.get('mat-grid-tile').should('have.length.gt', 0);
  });

  it('should show a floating add button', () => {
    cy.get('dino-floating-button').should('exist');
  });

  it('should navigate to the report schema create page when clicking the add button', () => {
    cy.get('dino-floating-button button').click();
    cy.url()
      .should('contain', 'reports')
      .should('contain', 'schema')
      .should('contain', 'create');
  });
});
