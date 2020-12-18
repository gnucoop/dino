import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {AUTH_SERVICE_CONFIG, AuthServiceConfig} from '@dewco/core/auth';
import {DATA_SERVICE_CONFIG, DataServiceConfig} from '@dewco/core/data';

import {FormSchema} from '.';
import {FormSchemaManager} from './form-schema-manager';

let testDbIdx = 0;

function dataServiceConfig(): DataServiceConfig {
  return {
    databaseCreateOptions: {
      name: `dewco_data_test_db_${testDbIdx++}`,
      adapter: 'memory',
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
};

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

export const formSchema: FormSchema = {
  id: '1',
  name: 'test_schema',
  schema: testAjfSchema,
  created_at: '',
  updated_at: '',
};

describe('FormSchemaManager', () => {
  let fsm: FormSchemaManager;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        FormSchemaManager,
        {provide: DATA_SERVICE_CONFIG, useValue: dataServiceConfig()},
        {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
      ],
    });
    fsm = TestBed.inject(FormSchemaManager);
  });

  it('should generate the correct filters from an AjfFormSchema', () => {
    const filters = fsm.generateAdditionalFilters(formSchema);
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
