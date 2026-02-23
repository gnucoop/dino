import {defineConfig} from 'cypress';
import path from 'path';
import fs from 'fs';

export default defineConfig({
  pageLoadTimeout: 180000,
  screenshotsFolder: 'docs/imgs',
  e2e: {
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser = {}, launchOptions) => {
        console.log(config, browser);
        console.log('Adding --disable-dev-shm-usage...');
        launchOptions.args.push('--disable-dev-shm-usage');

        return launchOptions;
      });

      // Move screenshots out of the spec-name subdirectory so they land
      // directly in docs/imgs/{section}/{name}.png
      on('after:screenshot', (details) => {
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
