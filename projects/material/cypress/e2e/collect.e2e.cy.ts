/** Clicks the card action whose icon is `icon`, on the first card that has it. */
const clickCardAction = (icon: string) =>
  cy
    .get('.dino-collect-card-bar mat-icon')
    .filter((_, el) => el.textContent!.trim() === icon)
    .first()
    .click({force: true});

describe('dino forms collect', {retries: {runMode: 1, openMode: 0}}, () => {
  beforeEach(() => cy.visit('/forms'));

  it('should display one or more cards', () => {
    cy.get('dino-collect').should('exist');
    cy.get('.dino-collect-card').should('exist').should('have.length.gt', 0);
  });

  it('should enter a form list page', () => {
    cy.get('.dino-collect-card').should('exist').first().click();
    cy.get('dino-list').should('exist');
    cy.url().should('contain', 'forms');
  });

  it('should enter an edit form schema page', () => {
    cy.get('.dino-collect-card').should('exist');
    clickCardAction('edit');
    cy.get('dino-edit-form-schema').should('exist');
    cy.url().should('contain', 'forms').should('contain', 'schema').should('contain', 'edit');
  });
});

describe('dino reports collect', {retries: {runMode: 1, openMode: 0}}, () => {
  beforeEach(() => cy.visit('/reports'));

  it('should display one or more cards', () => {
    cy.get('dino-collect').should('exist');
    cy.get('.dino-collect-card').should('exist').should('have.length.gt', 0);
  });

  it('should enter a report list page', () => {
    cy.get('.dino-collect-card').should('exist').first().click();
    cy.get('dino-list').should('exist');
    cy.url().should('contain', 'reports');
  });

  it('should enter an edit report schema page', () => {
    cy.get('.dino-collect-card').should('exist');
    clickCardAction('edit');
    cy.get('dino-edit-report-schema').should('exist');
    cy.url().should('contain', 'reports').should('contain', 'schema').should('contain', 'edit');
  });

  it('should have no group tag bar', () => {
    cy.get('.dino-collect-card').should('exist');
    cy.get('.dino-collect-tagbar').should('not.exist');
    cy.get('.dino-collect-section-head').should('not.exist');
  });
});

// --- Forms collect: filter bar ---

describe('dino forms collect - filter bar', {testIsolation: false}, () => {
  before(() => {
    cy.visit('/forms');
    cy.get('dino-collect').should('exist');
    cy.get('.dino-collect-card').should('have.length.gt', 0);
  });

  it('should show a filter bar with an input', () => {
    cy.get('dino-collect .dino-collect-filter').should('exist');
    cy.get('dino-collect .dino-collect-filter input').should('exist');
  });

  it('should show a filter_alt icon in the filter bar', () => {
    cy.get('dino-collect .dino-collect-filter mat-icon').should('contain.text', 'filter_alt');
  });

  it('should hide the cards when the filter matches nothing', () => {
    cy.get('dino-collect .dino-collect-filter input').type('zzzzzzzzz');
    cy.get('.dino-no-items-message').should('exist');
    cy.get('.dino-collect-card').should('have.length', 0);
  });

  it('should restore the cards after clearing the filters', () => {
    cy.get('dino-collect .dino-collect-filter input').clear();
    cy.get('.dino-collect-card').should('have.length.gt', 0);
    cy.get('.dino-no-items-message').should('not.exist');
  });
});

// --- Reports collect: filter bar ---

describe('dino reports collect - filter bar', {testIsolation: false}, () => {
  before(() => {
    cy.visit('/reports');
    cy.get('dino-collect').should('exist');
    cy.get('.dino-collect-card').should('have.length.gt', 0);
  });

  it('should show a filter bar with an input', () => {
    cy.get('dino-collect .dino-collect-filter').should('exist');
    cy.get('dino-collect .dino-collect-filter input').should('exist');
  });

  it('should hide the cards when the filter matches nothing', () => {
    cy.get('dino-collect .dino-collect-filter input').type('zzzzzzzzz');
    cy.get('.dino-no-items-message').should('exist');
    cy.get('.dino-collect-card').should('have.length', 0);
  });

  it('should restore the cards after clearing the filter', () => {
    cy.get('dino-collect .dino-collect-filter input').clear();
    cy.get('.dino-collect-card').should('have.length.gt', 0);
  });
});

// --- Forms collect: groups ---

describe('dino forms collect - groups', {testIsolation: false}, () => {
  before(() => {
    cy.visit('/forms');
    cy.get('.dino-collect-card').should('have.length.gt', 0);
  });

  it('should show the tag bar with the All chip selected', () => {
    cy.get('.dino-collect-tagbar').should('exist');
    cy.get('.dino-collect-chip-all').should('have.class', 'mat-mdc-chip-selected');
  });

  it('should render one section per group', () => {
    cy.get('.dino-collect-chip:not(.dino-collect-chip-all)').then(chips => {
      cy.get('.dino-collect-section-head').should('have.length', chips.length);
    });
  });

  it('should keep only the section of the selected group', () => {
    cy.get('.dino-collect-chip:not(.dino-collect-chip-all)').first().click();
    cy.get('.dino-collect-section-head').should('have.length', 1);
    cy.get('.dino-collect-chip-all').should('not.have.class', 'mat-mdc-chip-selected');
  });

  it('should show every section again from the All chip', () => {
    cy.get('.dino-collect-chip-all').click();
    cy.get('.dino-collect-chip:not(.dino-collect-chip-all)').then(chips => {
      cy.get('.dino-collect-section-head').should('have.length', chips.length);
    });
  });
});

// --- Forms collect: views ---

describe('dino forms collect - views', {testIsolation: false}, () => {
  before(() => {
    cy.clearLocalStorage('dino_collect_view_forms');
    cy.visit('/forms');
    cy.get('.dino-collect-card').should('have.length.gt', 0);
  });

  it('should switch to the list and keep it after a reload', () => {
    cy.get('.dino-collect-view-toggle mat-button-toggle[value="list"] button').click();
    cy.get('.dino-collect-row').should('have.length.gt', 0);
    cy.get('.dino-collect-card').should('have.length', 0);
    cy.reload();
    cy.get('.dino-collect-row').should('have.length.gt', 0);
  });

  it('should switch back to the grid', () => {
    cy.get('.dino-collect-view-toggle mat-button-toggle[value="grid"] button').click();
    cy.get('.dino-collect-card').should('have.length.gt', 0);
  });
});

// --- Forms collect: card content ---

describe('dino forms collect - card content', {retries: {runMode: 1, openMode: 0}}, () => {
  beforeEach(() => cy.visit('/forms'));

  it('should display a label inside each card', () => {
    cy.get('.dino-collect-card .dino-grid-label')
      .first()
      .should('exist')
      .invoke('text')
      .should('not.be.empty');
  });

  it('should display an icon inside each card', () => {
    cy.get('.dino-collect-card .dino-mat-icon').first().should('exist');
  });
});

// --- Reports collect: card content ---

describe('dino reports collect - card content', {retries: {runMode: 1, openMode: 0}}, () => {
  beforeEach(() => cy.visit('/reports'));

  it('should display a label inside each card', () => {
    cy.get('.dino-collect-card .dino-grid-label')
      .first()
      .should('exist')
      .invoke('text')
      .should('not.be.empty');
  });

  it('should display an icon inside each card', () => {
    cy.get('.dino-collect-card .dino-mat-icon').first().should('exist');
  });
});

// --- Forms collect: action buttons ---

describe('dino forms collect - action buttons', {retries: {runMode: 1, openMode: 0}}, () => {
  beforeEach(() => cy.visit('/forms'));

  it('should show an edit and a delete action on the cards', () => {
    cy.get('.dino-collect-card-bar mat-icon').should('contain.text', 'edit');
    cy.get('.dino-collect-card-bar mat-icon').should('contain.text', 'delete');
  });

  it('should open the public link dialog from a public form', () => {
    cy.get('.dino-collect-status-public').should('exist');
    clickCardAction('share');
    cy.get('dino-collect-share-dialog').should('exist');
    cy.get('dino-collect-share-dialog input').invoke('val').should('contain', '/f/');
    cy.get('dino-collect-share-dialog .dino-collect-share-close').click();
    cy.get('dino-collect-share-dialog').should('not.exist');
  });
});

// --- Reports collect: action buttons ---

describe('dino reports collect - action buttons', {retries: {runMode: 1, openMode: 0}}, () => {
  beforeEach(() => cy.visit('/reports'));

  it('should show an edit and a delete action, and no public link', () => {
    cy.get('.dino-collect-card-bar mat-icon').should('contain.text', 'edit');
    cy.get('.dino-collect-card-bar mat-icon').should('contain.text', 'delete');
    cy.get('.dino-collect-card-bar mat-icon').should('not.contain.text', 'share');
  });
});

// --- Forms collect: delete schema dialog ---

describe('dino forms collect - delete schema dialog', {testIsolation: false}, () => {
  before(() => {
    cy.visit('/forms');
    cy.get('dino-collect').should('exist');
    cy.get('.dino-collect-card').should('have.length.gt', 0);
    clickCardAction('delete');
    cy.get('mat-dialog-container').should('exist');
  });

  it('should display a dialog title', () => {
    cy.get('mat-dialog-container h4[mat-dialog-title]')
      .should('exist')
      .invoke('text')
      .should('not.be.empty');
  });

  it('should show a close/cancel button', () => {
    cy.get('.dino-cancel-button').should('exist');
  });

  it('should close the dialog when clicking the close button', () => {
    cy.get('.dino-cancel-button').click();
    cy.get('mat-dialog-container').should('not.exist');
    cy.get('.dino-collect-card').should('have.length.gt', 0);
  });
});

// --- Reports collect: delete schema dialog ---

describe('dino reports collect - delete schema dialog', {testIsolation: false}, () => {
  before(() => {
    cy.visit('/reports');
    cy.get('dino-collect').should('exist');
    cy.get('.dino-collect-card').should('have.length.gt', 0);
    clickCardAction('delete');
    cy.get('mat-dialog-container').should('exist');
  });

  it('should show a close/cancel button', () => {
    cy.get('.dino-cancel-button').should('exist');
  });

  it('should close the dialog when clicking the close button', () => {
    cy.get('.dino-cancel-button').click();
    cy.get('mat-dialog-container').should('not.exist');
    cy.get('.dino-collect-card').should('have.length.gt', 0);
  });
});

// --- Forms collect: add schema ---

describe('dino forms collect - add schema', {testIsolation: false}, () => {
  before(() => {
    cy.visit('/forms');
    cy.get('dino-collect').should('exist');
    cy.get('.dino-collect-card').should('have.length.gt', 0);
  });

  it('should show an add button in the toolbar', () => {
    cy.get('.dino-collect-toolbar .dino-collect-add').should('exist');
  });

  it('should navigate to the form schema create page when clicking the add button', () => {
    cy.get('.dino-collect-toolbar .dino-collect-add').click();
    cy.url().should('contain', 'forms').should('contain', 'schema').should('contain', 'create');
  });
});

// --- Reports collect: add schema ---

describe('dino reports collect - add schema', {testIsolation: false}, () => {
  before(() => {
    cy.visit('/reports');
    cy.get('dino-collect').should('exist');
    cy.get('.dino-collect-card').should('have.length.gt', 0);
  });

  it('should show an add button in the toolbar', () => {
    cy.get('.dino-collect-toolbar .dino-collect-add').should('exist');
  });

  it('should navigate to the report schema create page when clicking the add button', () => {
    cy.get('.dino-collect-toolbar .dino-collect-add').click();
    cy.url().should('contain', 'reports').should('contain', 'schema').should('contain', 'create');
  });
});
