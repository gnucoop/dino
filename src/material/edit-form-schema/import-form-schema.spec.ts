import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService, AuthServiceConfig} from '@dino/core/auth';
import {DATA_SERVICE_CONFIG, DataServiceConfig} from '@dino/core/data';
import {FormSchema, FormSchemaManager, FormSchemaVisibility} from '@dino/core/forms';
import * as pouchdbAdapterMemory from 'pouchdb-adapter-memory';
import {addPouchPlugin, getRxStoragePouch} from 'rxdb/plugins/pouchdb';
import {BehaviorSubject, of} from 'rxjs';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import {ImportFormSchema, EditFormSchemaModule} from './index';

let testDbIdx = 0;

const mockFormSchema: FormSchema = {
  id: 'test_schema_id',
  name: 'test_schema',
  schema: {},
  created_at: '',
  updated_at: '',
  visibility: FormSchemaVisibility.Public,
};

const mockDialogData = {
  formSchema: of(mockFormSchema),
  formConvUrl: 'formConvUrl',
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

describe('Import FormSchema', () => {
  let fixtureImportFormSchema: ComponentFixture<ImportFormSchema>;
  let importFormSchema: ImportFormSchema;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        EditFormSchemaModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        FormSchemaManager,
        {provide: MatDialogRef, useValue: mockDialogRef},
        {provide: AuthService, useValue: authServiceMock},
        {provide: DATA_SERVICE_CONFIG, useValue: dataServiceConfig()},
        {provide: MAT_DIALOG_DATA, useValue: mockDialogData},
      ],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    fixtureImportFormSchema = TestBed.createComponent(ImportFormSchema);
    importFormSchema = fixtureImportFormSchema.componentInstance;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the component', async () => {
    await fixtureImportFormSchema.whenStable();
    fixtureImportFormSchema.detectChanges();

    expect(importFormSchema).toBeTruthy();
  });

  it('should make a call to the provided FormConv API url', async () => {
    await fixtureImportFormSchema.whenStable();
    fixtureImportFormSchema.detectChanges();

    const excelEvt = {target: {files: ['excelFile']}};
    const setConvStatusSpy = spyOn<any>(importFormSchema, '_setConvStatus').and.callThrough();

    importFormSchema.onExcelfileSelected(excelEvt);

    await fixtureImportFormSchema.whenStable();
    fixtureImportFormSchema.detectChanges();

    const convReq = httpMock.expectOne('formConvUrl');
    expect(convReq.request.method).toBe('POST');
    convReq.flush({resp: 'ok'});

    expect(setConvStatusSpy).toHaveBeenCalledTimes(2);
    expect(setConvStatusSpy).toHaveBeenCalledWith('Excel file converted successfully!');
  });
});
