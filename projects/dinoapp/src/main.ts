import {
  enableProdMode,
  isDevMode,
  provideCheckNoChangesConfig,
  provideZonelessChangeDetection,
} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/dino.module';
import {environment} from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule, {
    applicationProviders: [
      provideZonelessChangeDetection(),
      // TEMPORARY, dev only: reports bindings that changed without notifying Angular,
      // the updates a zoneless app no longer renders. Remove once the zoneless pass is done.
      ...(isDevMode() ? [provideCheckNoChangesConfig({exhaustive: true, interval: 1000})] : []),
    ],
  })
  .catch(err => console.error(err));
