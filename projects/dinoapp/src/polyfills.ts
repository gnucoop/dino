/**
 * This file includes polyfills needed by Angular and is loaded before the app.
 * You can add your own extra polyfills to this file.
 *
 * This file is divided into 2 sections:
 *   1. Browser polyfills, sorted by browsers.
 *   2. Application imports. Files that should be loaded before your main file.
 *
 * The current setup is for so-called "evergreen" browsers; the last versions of
 * browsers that automatically update themselves. This includes Safari >= 10,
 * Chrome >= 55 (including Opera), Edge >= 13 on the desktop, and iOS 10 and
 * Chrome on mobile.
 *
 * Learn more in https://angular.io/guide/browser-support
 */

/***************************************************************************************************
 * BROWSER POLYFILLS
 */

import * as process from 'process';

/***************************************************************************************************
 * APPLICATION IMPORTS
 */
(window as any)['global'] = window;
(window as any)['process'] = process;
(window as any)['buffer'] = (window as any).global.Buffer || require('buffer').Buffer;
global.Buffer = global.Buffer || require('buffer').Buffer;
