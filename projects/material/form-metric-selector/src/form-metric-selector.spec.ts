import {EventEmitter} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AUTH_SERVICE_CONFIG, AuthService, AuthServiceConfig} from '@dino/core/auth';
import {DATA_SERVICE_CONFIG, DataServiceConfig} from '@dino/core/data';
import {getRxStorageMemory} from 'rxdb/plugins/storage-memory';
import {NEVER, BehaviorSubject, of} from 'rxjs';

import {FormMetricSelector, FormMetricSelectorModule} from './public_api';
import {MatDialogRef} from '@angular/material/dialog';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {ActivatedRoute} from '@angular/router';
import {MatNativeDateModule} from '@angular/material/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CaseManager} from '@dino/core/cases';
import {NameMatchValidator} from '@dino/material/metric-editor';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';

let testDbIdx = 0;

function dataServiceConfig(): DataServiceConfig {
  return {
    databaseCreateOptions: {
      name: `dino_datamanager_test_db_${testDbIdx++}`,
      storage: getRxStorageMemory(),
    },
    syncOptions: {
      collection:null,
      replicationIdentifier: 'test-replication',
      url: {http: 'host'},
    },
  };
}

const mockDialogRef = {
  close: (_: any) => of(null),
  open: () => of(null),
  backdropClick: () => of(null),
};

const authServiceConfig: AuthServiceConfig = {
  host: 'http://test-auth-backend',
  applicationId: 'applicationId',
  apiKey: 'apiKey',
  retryRefreshTime: 5000,
  retryAttemptsMax: 1,
  failedAuthRedirect: 'login',
};

const authServiceMock = {
  authenticated: of({auth: true, evt: 'init'}),
  authToken: of('test_auth_token'),
  // Never resumes in tests: this is not a foregrounded browser tab.
  appResumed: NEVER,
  getUserInfo: () => {
    return {};
  },
  resetEvt: of(false),
  logout: () => of(false),
  logoutEvt: new EventEmitter<void>(),
  _authConfig: new BehaviorSubject<AuthServiceConfig>(authServiceConfig),
  authConfig: authServiceConfig,
} as unknown as AuthService;

const paramsSubject = new BehaviorSubject({});

const mockCase = {
  option: {
    id: 'metric_id',
    name: 'caso prova',
    code: 123,
    parent_id: null,
    parent_name: null,
    metric_data: {
      'info': 'case info'
    },
    created_at: '',
    updated_at: '',
  },
  secondaryMetricFieldsDisplayed: {'case': 'metric_data info'},
  metricType: 'case'

}

describe('Form Metric Selector', () => {
  let fixtureFormMetricSelector: ComponentFixture<FormMetricSelector>;
  let formMetricSelector: FormMetricSelector;
  let dialogRef: MatDialogRef<FormMetricSelector>;
  let route: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [BrowserAnimationsModule,
        FormMetricSelectorModule,
        MatNativeDateModule],
    providers: [
        CaseManager,
        NameMatchValidator,
        {provide: MatDialogRef, useValue: mockDialogRef},
        {provide: ActivatedRoute, useValue: { params: paramsSubject, queryParams: of([])}},
        {provide: AuthService, useValue: authServiceMock},
        {provide: DATA_SERVICE_CONFIG, useValue: dataServiceConfig()},
        {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
}).compileComponents();
    dialogRef = TestBed.inject(MatDialogRef<FormMetricSelector>);
    route = TestBed.inject(ActivatedRoute);
    fixtureFormMetricSelector = TestBed.createComponent(FormMetricSelector);
    formMetricSelector = fixtureFormMetricSelector.componentInstance;
  });

  it('should create the component', async () => {
    await fixtureFormMetricSelector.whenStable();
    fixtureFormMetricSelector.detectChanges();

    expect(formMetricSelector).toBeTruthy();
    expect(dialogRef).toBeTruthy();
    expect(route).toBeTruthy();
  });

  it('should call "_getReadonlyFields" method whenever Metric Dialog gets opened', async () => {
    await fixtureFormMetricSelector.whenStable();
    const getReadOnlyFieldsSpy = spyOn<any>(formMetricSelector, '_getReadonlyFields').and.callThrough();
    fixtureFormMetricSelector.detectChanges();

    formMetricSelector.openCreateMetricDialog(new Event('click'), 'case');

    expect(getReadOnlyFieldsSpy).toHaveBeenCalledWith('case');
  });

  it('should correctly display the metric names in the field by executing "displayMetricName" method', async () => {
    await fixtureFormMetricSelector.whenStable();
    fixtureFormMetricSelector.detectChanges();

    const displayedName = formMetricSelector.displayMetricName(mockCase);

    expect(displayedName).toEqual('caso prova - (case info)');
  });
});
