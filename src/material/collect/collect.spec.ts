import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import * as pouchdbAdapterMemory from 'pouchdb-adapter-memory';
import {addPouchPlugin, getRxStoragePouch} from 'rxdb/plugins/pouchdb';
import {BehaviorSubject, of} from 'rxjs';

import {AUTH_SERVICE_CONFIG, AuthService, AuthServiceConfig} from '../../core/auth';
import {DATA_SERVICE_CONFIG, DataServiceConfig} from '../../core/data';
import {FormSchemaManager} from '../../core/forms';

import {Collect, CollectModule} from './index';

let testDbIdx = 0;

addPouchPlugin(pouchdbAdapterMemory);
function dataServiceConfig(): DataServiceConfig {
  return {
    databaseCreateOptions: {
      name: `dewco_datamanager_test_db_${testDbIdx++}`,
      storage: getRxStoragePouch('memory'),
    },
    syncOptions: {
      url: 'host',
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
  authenticated: of(true),
  getUserInfo: () => {
    return {};
  },
  resetEvt: of(false),
  _authConfig: new BehaviorSubject<AuthServiceConfig>(authServiceConfig),
  authConfig: authServiceConfig,
} as unknown as AuthService;

describe('Collect', () => {
  let fsm: FormSchemaManager;
  let fixtureCollect: ComponentFixture<Collect>;
  let collect: Collect;

  beforeEach(() => {
    TestBed
        .configureTestingModule({
          imports: [
            CollectModule,
            HttpClientTestingModule,
            RouterTestingModule,
          ],
          providers: [
            {provide: AuthService, useValue: authServiceMock},
            {provide: DATA_SERVICE_CONFIG, useValue: dataServiceConfig()},
            {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
          ],
        })
        .compileComponents();

    fsm = TestBed.inject(FormSchemaManager);
    fixtureCollect = TestBed.createComponent(Collect);
    collect = fixtureCollect.componentInstance;
  });

  it('should create the component', async () => {
    await fixtureCollect.whenStable();
    fixtureCollect.detectChanges();

    expect(collect).toBeTruthy();
    expect(fsm).toBeTruthy();
  });

  it('should search for all Form Schemas', async () => {
    let isFormsCollectSpy = spyOn(fsm, 'list').and.callThrough();

    await fixtureCollect.whenStable();
    collect.isFormsCollect = true;
    fixtureCollect.detectChanges();

    expect(isFormsCollectSpy).toHaveBeenCalled();
  });
});
