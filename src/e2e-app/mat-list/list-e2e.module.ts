import {
  AJF_WARNING_ALERT_SERVICE,
  AjfFieldWarningAlertResult,
  AjfFormRendererService,
  AjfValidationService,
  AjfWarningAlertService,
} from '@ajf/core/forms';
import {ErrorHandler, NgModule} from '@angular/core';
import {AuthService, User} from '@dewco/core/auth';
import {DATA_SERVICE_CONFIG, DataServiceConfig} from '@dewco/core/data';
import {ErrorHandlerService} from '@dewco/core/error-handler';
import {LocationModule} from '@dewco/core/locations';
import {ProjectModule} from '@dewco/core/projects';
import {ListModule} from '@dewco/material/list';
import {SearchFiltersBarModule} from '@dewco/material/searchfilters-bar';
import {Observable, of as obsOf} from 'rxjs';

import {MatListE2E} from './list-e2e';

const dummyUser: User = {
  id: 'userid',
  email: 'user@dewco.gnu',
  firstName: 'dummy',
  lastName: 'dewco',
  active: true,
  verified: true,
  tenantId: '1',
  insertInstant: 1,
  lastLoginInstant: 1,
  passwordChangeRequired: false,
  passwordLastUpdateInstant: 1,
  twoFactorEnabled: false,
  twoFactorDelivery: 'None',
  usernameStatus: 'ACTIVE',
  registrations: []
};

const authServiceMock = {
  login(): Observable<boolean> {
    return obsOf(true);
  },
  authenticated: obsOf(true),
  getUserInfo: () => {
    return dummyUser;
  },
} as unknown as AuthService;

let testDbIdx = 0;

const serverUrl = '/';

const warningServiceToken: AjfWarningAlertService = {
  showWarningAlertPrompt(warnings: string[]): Observable<AjfFieldWarningAlertResult> {
    const res: AjfFieldWarningAlertResult = {result: true};
    return obsOf(res);
  }
};

function dataServiceConfig(): DataServiceConfig {
  return {
    databaseCreateOptions: {
      name: `dewco_list_test_db_${testDbIdx++}`,
      adapter: 'idb',
    },
    syncOptions: {
      url: serverUrl,
    },
  };
}


@NgModule({
  declarations: [
    MatListE2E,
  ],
  imports: [
    ListModule,
    LocationModule,
    ProjectModule,
    SearchFiltersBarModule,
  ],
  providers: [
    AjfFormRendererService,
    AjfValidationService,
    {provide: AJF_WARNING_ALERT_SERVICE, useValue: warningServiceToken},
    {provide: AuthService, useValue: authServiceMock},
    {provide: DATA_SERVICE_CONFIG, useValue: dataServiceConfig()},
    {provide: ErrorHandler, useClass: ErrorHandlerService},
  ],
})
export class MaterialListE2eModule {
}
