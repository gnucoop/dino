/**
 * Opens the data list of the first form schema.
 *
 * The list is reached from the forms page, the way a user reaches it, and not by
 * building the url from the seed data: DataService assigns a fresh uuid to every
 * inserted document, so the ids in the fixtures never make it into the database.
 * Visiting `/forms/<seed id>` opens the list of a schema that does not exist,
 * which renders an empty page and leaves the tests asserting on nothing.
 */
export const openFirstFormList = (): void => {
  cy.visit('/forms');
  cy.get('dino-collect').should('exist');
  cy.get('mat-grid-tile').should('exist').first().click();
  cy.url().should('match', /\/forms\/[^/]+$/);
};
