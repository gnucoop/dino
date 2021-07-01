import {MatPaginatorDefaultOptions} from '@angular/material/paginator';
import {AuthServiceConfig} from '@dewco/core/auth';

const applicationId = 'd8b568f7-713c-4076-9703-523e1284a62f';
const host = `http://localhost:9011`;
export const fusionAuthConfig: AuthServiceConfig = {
  host: host,
  applicationId: applicationId,
  apiKey: `vCsLg58OXMf3beO4rErBTtiMR1Jl30ta7XoLRCLY6UHU_FDkUvsYX_fx`,
  retryRefreshTime: 3000,
  retryAttemptsMax: 1,
  failedAuthRedirect: 'login',
};

// Paginator default config
export const paginatorConfig: MatPaginatorDefaultOptions = {
  pageSize: 10,
  pageSizeOptions: [5, 10, 25, 50, 100],
};
