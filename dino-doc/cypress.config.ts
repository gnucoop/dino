import {defineConfig} from 'cypress';
import path from 'path';
import fs from 'fs';

export default defineConfig({
  pageLoadTimeout: 180000,
  screenshotsFolder: 'docs/imgs',
  viewportWidth: 1440,
  viewportHeight: 900,
  scrollBehavior: false,
  e2e: {
    supportFile: false,
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser = {}, launchOptions) => {
        console.log(config, browser);
        console.log('Adding --disable-dev-shm-usage...');
        launchOptions.args.push('--disable-dev-shm-usage');

        if (browser.name === 'chrome' || browser.name === 'chromium') {
          // Window must be larger than viewport to accommodate browser chrome.
          // Cypress sets the viewport via its own config (1440x900); the window
          // just needs enough room so it doesn't constrain the viewport.
          launchOptions.args.push('--window-size=1600,1100');
        }

        return launchOptions;
      });

      // Move screenshots out of the spec-name subdirectory so they land
      // directly in docs/imgs/{section}/{name}.png
      on('after:screenshot', details => {
        const screenshotsFolder = config.screenshotsFolder;
        // details.path is e.g. docs/imgs/docs-screenshots.cy.js/getting-started/login.png
        // We want:            docs/imgs/getting-started/login.png
        const relativeToCypress = path.relative(screenshotsFolder, details.path);
        const parts = relativeToCypress.split(path.sep);
        // Remove the spec-name directory (first segment)
        if (parts.length > 1) {
          const newRelative = parts.slice(1).join(path.sep);
          const newPath = path.join(screenshotsFolder, newRelative);
          fs.mkdirSync(path.dirname(newPath), {recursive: true});
          fs.renameSync(details.path, newPath);

          // Clean up the leftover spec-name directory
          const specDir = path.join(screenshotsFolder, parts[0]);
          try {
            fs.rmSync(specDir, {recursive: true, force: true});
          } catch {
            // ignore — may still have files being written
          }

          return {path: newPath};
        }
        return {};
      });
    },
  },
});
