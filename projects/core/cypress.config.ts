import {defineConfig} from 'cypress';

export default defineConfig({
  videosFolder: 'projects/core/cypress/videos',
  screenshotsFolder: 'projects/core/cypress/screenshots',
  fixturesFolder: 'projects/core/cypress/fixtures',
  video: false,
  defaultCommandTimeout: 60000,
  pageLoadTimeout: 180000,
  e2e: {
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser = {}, launchOptions) => {
        console.log(config, browser);
        console.log('Adding --disable-dev-shm-usage...');
        launchOptions.args.push('--disable-dev-shm-usage');

        return launchOptions;
      });
    },

    specPattern: 'projects/core/cypress/e2e/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'projects/core/cypress/support/index.ts',
    baseUrl: 'http://localhost:4200',
  },
});
