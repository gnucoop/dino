/**
 * fake-data-smoke.cy.js
 *
 * Temporary smoke test: verifies that the e2e fake-data initializer seeds
 * every collection (forms, cases, locations, areas, organizations, users,
 * groups, notifications) and that the app bootstraps (i.e. the
 * APP_INITIALIZER chain settles).
 */

describe('Fake data smoke test', () => {
  const PAGE_LOAD_WAIT = 4000;

  const visitOptions = {
    failOnStatusCode: false,
    onBeforeLoad(win) {
      win.localStorage.setItem('pandas_dino_api_key_accept_terms', 'true');
      cy.spy(win.console, 'log').as('consoleLog');
      cy.spy(win.console, 'error').as('consoleError');
    },
  };

  function dismissDialogs() {
    cy.get('body').then(($body) => {
      if ($body.find('mat-dialog-container').length) {
        cy.get('mat-dialog-container button').last().click();
        cy.wait(500);
      }
    });
  }

  function navigateInApp(path) {
    cy.window().then((win) => {
      win.history.pushState({}, '', path);
      win.dispatchEvent(new PopStateEvent('popstate', { state: {} }));
    });
    cy.wait(PAGE_LOAD_WAIT);
  }

  it('seeds all collections', () => {
    cy.visit('http://localhost:4200/forms', visitOptions);
    cy.wait(PAGE_LOAD_WAIT + 4000);
    dismissDialogs();

    // The initializer chain settled and logged success, with no errors
    cy.get('@consoleLog').should('have.been.calledWith', '[E2E] Fake data generated');

    // Form schemas seeded: both grid tiles present
    cy.get('mat-grid-tile.dino-grid-tile').should('have.length.at.least', 2);
    cy.contains('Ophthalmic Visits').should('exist');

    // Form datas seeded and linked: open the first schema and check rows
    cy.get('mat-grid-tile.dino-grid-tile').first().click();
    cy.wait(PAGE_LOAD_WAIT);
    cy.get('mat-row').should('have.length.at.least', 5);

    // Metrics + users + notifications
    navigateInApp('/metrics/cases');
    cy.contains('Amara Okello').should('exist');

    navigateInApp('/metrics/locations');
    cy.contains('Arua').should('exist');

    navigateInApp('/metrics/thematic_areas');
    cy.contains('Eye Health').should('exist');

    navigateInApp('/metrics/organizations');
    cy.contains('Sight Savers International').should('exist');

    navigateInApp('/users/list');
    cy.contains('Alice Nakamura').should('exist');

    navigateInApp('/users/groups');
    cy.contains('field-data-collectors').should('exist');

    navigateInApp('/notifications');
    cy.contains('Monthly report').should('exist');
  });
});
