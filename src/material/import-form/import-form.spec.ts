import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormBuilder} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthService, AuthServiceConfig} from '@dino/core/auth';
import {DATA_SERVICE_CONFIG, DataServiceConfig, MetricsService} from '@dino/core/data';
import {FormDataManager} from '@dino/core/forms';
import * as pouchdbAdapterMemory from 'pouchdb-adapter-memory';
import {addPouchPlugin, getRxStoragePouch} from 'rxdb/plugins/pouchdb';
import {BehaviorSubject, of} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import {ImportForm} from './index';
import {formDatasCsv} from './test-import-formdata';

let testDbIdx = 0;

const mockDialogData = {
  formSchema: 'test_schema_id',
};

addPouchPlugin(pouchdbAdapterMemory);
function dataServiceConfig(): DataServiceConfig {
  return {
    databaseCreateOptions: {
      name: `dino_datamanager_test_db_${testDbIdx++}`,
      storage: getRxStoragePouch('memory'),
    },
    syncOptions: {
      url: 'host',
    },
  };
}

const mockDialogRef = {
  close: () => of(null),
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
  authenticated: of(true),
  authToken: of('test_auth_token'),
  getUserInfo: () => {
    return {};
  },
  resetEvt: of(false),
  _authConfig: new BehaviorSubject<AuthServiceConfig>(authServiceConfig),
  authConfig: authServiceConfig,
} as unknown as AuthService;

const formDataManagerMock = {
  bulkCreate: (_: any[]) => {
    return of({success: [], error: []});
  },
};

const metricServiceManagerMock = {
  activeMetrics: new BehaviorSubject<{metricName: string}[]>([{metricName: 'project'}]),
};

describe('Import Forms', () => {
  let fixtureImportForm: ComponentFixture<ImportForm>;
  let importForm: ImportForm;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      providers: [
        FormBuilder,
        {provide: MatDialogRef, useValue: mockDialogRef},
        {provide: AuthService, useValue: authServiceMock},
        {provide: FormDataManager, useValue: formDataManagerMock},
        {provide: MetricsService, useValue: metricServiceManagerMock},
        {provide: DATA_SERVICE_CONFIG, useValue: dataServiceConfig()},
        {provide: MAT_DIALOG_DATA, useValue: mockDialogData},
      ],
    }).compileComponents();
    fixtureImportForm = TestBed.createComponent(ImportForm);
    importForm = fixtureImportForm.componentInstance;
  });

  it('should create the component', async () => {
    await fixtureImportForm.whenStable();
    fixtureImportForm.detectChanges();
    expect(importForm).toBeTruthy();
  });

  it('should start the import forms process from csv file', async () => {
    await fixtureImportForm.whenStable();
    fixtureImportForm.detectChanges();
    const spyImportXlsx = spyOn<any>(importForm, '_importXlsx').and.callThrough();
    const file = new Blob([formDatasCsv], {type: 'text/csv'});
    const excelEvt = {target: {files: [file]}};
    importForm.onExcelfileSelected(excelEvt);
    importForm.apply();
    expect(spyImportXlsx).toHaveBeenCalledTimes(1);
  });
});
