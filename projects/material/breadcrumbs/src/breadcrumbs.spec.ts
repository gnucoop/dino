import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {DATA_SERVICE_CONFIG, DataServiceConfig} from '@dino/core/data';
import * as pouchdbAdapterMemory from 'pouchdb-adapter-memory';
import {addPouchPlugin, getRxStoragePouch} from 'rxdb';
import {AUTH_SERVICE_CONFIG, AuthServiceConfig} from '@dino/core/auth';

import {BreadCrumbs, BreadcrumbsModule} from './public_api';

let testDbIdx = 0;

const serverUrl = 'http://dinoServer/v1/graphql';
const wsServerUrl = 'ws://dinoServer';
const wsUrl = `${wsServerUrl}/v1/graphql`;

addPouchPlugin(pouchdbAdapterMemory);
const dataServiceConfig: DataServiceConfig = {
  databaseCreateOptions: {
    name: `dino_data_test_db_${testDbIdx++}`,
    storage: getRxStoragePouch('memory'),
    ignoreDuplicate: true,
  },
  syncOptions: {
    url: serverUrl,
    wsUrl,
    webSocketImpl: WebSocket,
    authErrorMessage: 'Could not verify JWT: JWTExpired',
  },
};

const authServiceConfig: AuthServiceConfig = {
  host: 'http://test-auth-backend',
  applicationId: 'applicationId',
  apiKey: 'apiKey',
  retryRefreshTime: 5000,
  retryAttemptsMax: 1,
  failedAuthRedirect: 'login',
};

describe('BreadCrumbs', () => {
  let fixtureBreadcrumbs: ComponentFixture<BreadCrumbs>;
  let breadCrumbs: BreadCrumbs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BreadcrumbsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [
        {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
        {provide: DATA_SERVICE_CONFIG, useValue: dataServiceConfig},
      ],
    }).compileComponents();
    fixtureBreadcrumbs = TestBed.createComponent(BreadCrumbs);
    breadCrumbs = fixtureBreadcrumbs.componentInstance;
  });

  it('should create the component', async () => {
    await fixtureBreadcrumbs.whenStable();
    fixtureBreadcrumbs.detectChanges();

    expect(breadCrumbs).toBeTruthy();
  });
});
