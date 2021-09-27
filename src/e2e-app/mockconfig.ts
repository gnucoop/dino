import {MatDialogConfig} from '@angular/material/dialog';
import {MatPaginatorDefaultOptions} from '@angular/material/paginator';
import {AuthServiceConfig} from '@dewco/core/auth';
import {ConfigServiceConfig} from '@dewco/core/config';

const applicationId = 'c7576d4b-1be7-4381-98b5-d02f13f5dadd';
const host = `http://localhost:9011`;
export const authConfig: AuthServiceConfig = {
  host: host,
  applicationId: applicationId,
  apiKey: `jVe6r5r3u-0sAHjo1nzAIk6j5JTB1_qZOunuY4oMSSBIXClCKbA-3rJb`,
  retryRefreshTime: 3000,
  retryAttemptsMax: 1,
  failedAuthRedirect: 'login',
};

export const configurationConfig: ConfigServiceConfig = {
  apiUrl: 'https://dev.cpainitiative.org/instances',
};

// Paginator default config
export const paginatorConfig: MatPaginatorDefaultOptions = {
  pageSize: 10,
  pageSizeOptions: [5, 10, 25, 50, 100],
};

// Dialog default config
export const dialogConfig: MatDialogConfig = new MatDialogConfig();
dialogConfig.minWidth = '95vw';
dialogConfig.maxWidth = '95vw';

/**
 * Any additional configurable parameters
 */
export const additionalConfig = {
  /**
   * If true, fake data is generated from test-ajf-formschema and test-ajf-formdata
   * when the e2e-app starts
   */
  generateData: false,

  /**
   * If true, authGuard is on for all guarded routes.
   * Set this to false to correctly perform e2e-tests.
   */
  authGuard: true,

  /**
   * If true, the real auth service will be used to authenticate
   * users against the external authentication platform.
   * Set this to false to correctly perform e2e-tests.
   */
  externalAuthentication: true,

  /**
   * Config the mocked breakpointobserver service for "large" or "small" screens
   */
  isSmallScreen: false,

  /**
   * If true, Dynamic Configuration is activated, and the user can choose
   * the Platform to log in to from a select dropdown during login.
   * Those configs must be provided by an external API.
   */
  dynamicConfiguration: false,
};

/**
 * Optional Modules Config.
 * Can activate/deactivate all optional modules in the app.
 */
export const optionalModulesConfig = {
  /**
   * Thematic areas module.
   */
  areasModule: true,

  /**
   * Projects module.
   */
  projectsModule: true,

  /**
   * Locations module.
   */
  locationsModule: true,

  /**
   * Organizations module.
   */
  organizationsModule: true,
};
