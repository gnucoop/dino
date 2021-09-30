import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import * as pouchdbAdapterMemory from 'pouchdb-adapter-memory';
import {addPouchPlugin, getRxStoragePouch} from 'rxdb/plugins/pouchdb';
import {BehaviorSubject, of} from 'rxjs';

import {AUTH_SERVICE_CONFIG, AuthService, AuthServiceConfig} from '../auth';
import {DATA_SERVICE_CONFIG, DataServiceConfig} from '../data';

import {ReportSchema, ReportSchemaManager} from './index';

let testDbIdx = 0;

addPouchPlugin(pouchdbAdapterMemory);
function dataServiceConfig(): DataServiceConfig {
  return {
    databaseCreateOptions: {
      name: `dewco_data_test_db_${testDbIdx++}`,
      storage: getRxStoragePouch('memory'),
    },
    syncOptions: {
      url: 'http://dewcoServer/v1/graphql',
      wsUrl: 'ws://dewcoServer/v1/graphql',
      webSocketImpl: WebSocket,
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

const testAjfSchema = {
  'nodes': [
    {
      'id': 1,
      'name': '_1',
      'label': 'DUMMY FILTER GROUP',
      'nodes': [
        {
          'id': 101,
          'name': 'f_1_101',
          'size': 'normal',
          'label': 'Name',
          'parent': 1,
          'editable': true,
          'nodeType': 0,
          'fieldType': 0,
          'hasChoices': true,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': [{'condition': 'true'}]
        },
      ],
      'parent': 0,
      'nodeType': 3,
      'parentNode': 0,
      'visibility': {'condition': 'true'},
      'conditionalBranches': [{'condition': 'true'}]
    },
  ]
};

export const reportSchema: ReportSchema = {
  id: '1',
  name: 'test_schema',
  schema: testAjfSchema,
  created_at: '',
  updated_at: '',
};

describe('ReportSchemaManager', () => {
  let fsm: ReportSchemaManager;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        ReportSchemaManager,
        {provide: DATA_SERVICE_CONFIG, useValue: dataServiceConfig()},
        {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
        {provide: AuthService, useValue: authServiceMock},
      ],
    });
    fsm = TestBed.inject(ReportSchemaManager);
  });

  it('should generate the correct filters from an AjfReportSchema', () => {
    const filters = fsm.generateAdditionalFilters(reportSchema);
    const filterGroup = filters[0];
    const additionalFilters = filterGroup.filterGroupAdditionalFilters!;

    expect(filters.length).toEqual(1);
    expect(filterGroup).not.toBeNull();
    expect(filterGroup.filterGroupName).toEqual('DUMMY FILTER GROUP');
    expect(additionalFilters).not.toBeNull();
    expect(additionalFilters.length).toEqual(1);
    expect(additionalFilters[0]).not.toBeNull();
    expect(additionalFilters[0].label).toEqual('Name');
    expect(additionalFilters[0].isAdditionalFilter).toBeTrue();
  });
});
