import {defineConfig} from 'cypress';

export default defineConfig({
  videosFolder: 'projects/material/cypress/videos',
  screenshotsFolder: 'projects/material/cypress/screenshots',
  fixturesFolder: 'projects/material/cypress/fixtures',
  video: false,
  defaultCommandTimeout: 10000,
  e2e: {
    specPattern: 'projects/material/cypress/e2e/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'projects/material/cypress/support/index.ts',
    baseUrl: 'http://localhost:4200',
  },
});
