import {MatPaginatorDefaultOptions} from '@angular/material/paginator';
import {AuthServiceConfig} from '@dewco/core/auth';

const applicationId = 'a1c21574-d057-4477-b65e-e9a8af5d3f6e';
const host = `http://localhost:9011`;
export const fusionAuthConfig: AuthServiceConfig = {
  host: host,
  applicationId: applicationId,
  apiKey: `HMz6kUZwwyu9D4PEVb-HPAeVUghw_YcXSc7QnAWdB8O470s4FPDEsVZI`,
  retryRefreshTime: 3000,
  retryAttemptsMax: 1,
  failedAuthRedirect: 'login',
};

// Paginator default config
export const paginatorConfig: MatPaginatorDefaultOptions = {
  pageSize: 10,
  pageSizeOptions: [5, 10, 25, 50, 100],
};

/**
 * Any additional configurable parameters
 */
export const additionalConfig = {
  /**
   * If true, fake data is generated from test-ajf-formschema and test-ajf-formdata
   * when the e2e-app starts
   */
  generateData: true,

  /**
   * Config the breakpointobserver service for "large" or "small" screens
   */
  isSmallScreen: false,
};
