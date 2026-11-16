import {defineConfig} from 'vitest/config';

/**
 * Shared by the `test` targets of core, material and dinoapp (`runnerConfig: true`).
 */
export default defineConfig({
  test: {
    // Jasmine removes every spy after each test: without this a vi.spyOn() would keep
    // stubbing the method for the tests that follow, since the files share one context.
    restoreMocks: true,
    server: {
      deps: {
        // Run through Vite rather than loaded by Node. apollo-angular and AJF import
        // `@apollo/client/core` and `pdfmake/build/pdfmake` without a file extension,
        // which Node's ESM loader refuses. ngx-papaparse does `import * as` of the UMD
        // papaparse, whose functions Node only exposes on `default`: Vitest's interop finds them.
        inline: [
          'apollo-angular',
          '@ajf/core',
          '@ajf/material',
          '@ajf/calendars',
          'ngx-papaparse',
        ],
      },
    },
  },
});
