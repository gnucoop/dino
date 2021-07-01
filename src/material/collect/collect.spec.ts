import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AUTH_SERVICE_CONFIG, AuthService, AuthServiceConfig} from '@dewco/core/auth';
import {DATA_SERVICE_CONFIG, DataServiceConfig} from '@dewco/core/data';
import {FormSchemaManager} from '@dewco/core/forms';
import {of} from 'rxjs';

import {Collect} from './collect';
import {CollectModule} from './collect.module';

const authServiceMock = {
  authenticated: of(true),
  getUserInfo: () => {
    return {};
  },
} as unknown as AuthService;

let testDbIdx = 0;

function dataServiceConfig(): DataServiceConfig {
  return {
    databaseCreateOptions: {
      name: `dewco_datamanager_test_db_${testDbIdx++}`,
      adapter: 'memory',
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
