import {defineConfig} from 'cypress';

export default defineConfig({
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
  },
});
