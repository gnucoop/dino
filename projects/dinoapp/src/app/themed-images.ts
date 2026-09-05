import {ThemeService} from '@dino/material/core';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {environment} from '../environments/environment';

/**
 * A pair of image paths, one per theme.
 */
export interface ThemedImage {
  light: string;
  dark: string;
}

const custom = environment.customImagesConfig;

/**
 * Resolves a themed image from the deployment configuration.
 *
 * A deployment that configures only the light image keeps it in both themes: dropping our
 * dark artwork in would be putting the DINO brand on someone else's app. Only when nothing
 * is configured at all do the two DINO defaults apply.
 */
function themed(light: string | undefined, dark: string | undefined, defaults: ThemedImage) {
  return {
    light: light ?? defaults.light,
    dark: dark ?? light ?? defaults.dark,
  };
}

/**
 * The lockup in the sidebar brand row and in the compact top bar.
 */
export const headerLogo: ThemedImage = themed(custom?.logoLight, custom?.logoDark, {
  light: 'assets/icons/logos/dino-login-light.svg',
  dark: 'assets/icons/logos/dino-login-dark.svg',
});

/**
 * The mark on its own, for the collapsed sidebar rail where the lockup does not fit.
 */
export const logoMark: ThemedImage = themed(custom?.logoLight, custom?.logoDark, {
  light: 'assets/icons/logos/dino-spinner-light.svg',
  dark: 'assets/icons/logos/dino-spinner-dark.svg',
});

/**
 * The mark spun by dino-loading-spinner, on the initialization screen and while a report
 * or the dashboard loads.
 */
export const loadingSpinner: ThemedImage = themed(custom?.spinnerLight, custom?.spinnerDark, {
  light: 'assets/icons/logos/dino-spinner-light.svg',
  dark: 'assets/icons/logos/dino-spinner-dark.svg',
});

/**
 * The path to draw for the active theme, re-emitted whenever the theme changes.
 * @param ts The theme service
 * @param image The light/dark pair to pick from
 */
export function themedImagePath(ts: ThemeService, image: ThemedImage): Observable<string> {
  return ts.darkModeChange.pipe(
    map(isDark => (isDark ? image.dark : image.light)),
    startWith(ts.isDark() ? image.dark : image.light),
  );
}
