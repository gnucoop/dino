import {EventEmitter} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MatDialogModule} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService, AuthServiceConfig} from '@dino/core/auth';
import {DATA_SERVICE_CONFIG, DataServiceConfig, InsertModel} from '@dino/core/data';
import {FormSchema, FormSchemaManager, FormStatusManager} from '@dino/core/forms';
import {getRxStorageMemory} from 'rxdb/plugins/storage-memory';
import {NEVER, BehaviorSubject, Observable, of} from 'rxjs';

import {EditFormSchema, EditFormSchemaModule} from './public_api';
import {RxDocument} from 'rxdb';
import {TRANSLATIONS_CONFIG} from '@dino/core/translations';

let testDbIdx = 0;

function dataServiceConfig(): DataServiceConfig {
  return {
    databaseCreateOptions: {
      name: `dino_datamanager_test_db_${testDbIdx++}`,
      storage: getRxStorageMemory(),
    },
    syncOptions: {
      collection: null,
      replicationIdentifier: 'test-replication',
      url: {http: 'host'},
    },
  };
}

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

class FormSchemaManagerMock extends FormSchemaManager {
  override create(_obj: InsertModel<FormSchema>): Observable<RxDocument<FormSchema> | null> {
    return of(null);
  }
}

describe('Edit FormSchema', () => {
  let fixtureEditFormSchema: ComponentFixture<EditFormSchema>;
  let editFormSchema: EditFormSchema;
  let fsm: FormSchemaManager;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        EditFormSchemaModule,
        RouterTestingModule,
        MatDialogModule,
      ],
      providers: [
        FormStatusManager,
        {provide: AuthService, useValue: authServiceMock},
        {provide: FormSchemaManager, useClass: FormSchemaManagerMock},
        {provide: DATA_SERVICE_CONFIG, useValue: dataServiceConfig()},
        {provide: TRANSLATIONS_CONFIG, useValue: {defaultLanguage: 'eng'}},
      ],
    }).compileComponents();

    fsm = TestBed.inject(FormSchemaManager);
    fixtureEditFormSchema = TestBed.createComponent(EditFormSchema);
    editFormSchema = fixtureEditFormSchema.componentInstance;
  });

  it('should create the component', async () => {
    await fixtureEditFormSchema.whenStable();
    fixtureEditFormSchema.detectChanges();

    expect(editFormSchema).toBeTruthy();
  });

  it('should call the FormSchemaManager create method', async () => {
    await fixtureEditFormSchema.whenStable();
    const createFormSchemaSpy = spyOn(fsm, 'create').and.callThrough();
    fixtureEditFormSchema.detectChanges();

    editFormSchema.save();

    expect(createFormSchemaSpy).toHaveBeenCalledTimes(1);
  });
});
