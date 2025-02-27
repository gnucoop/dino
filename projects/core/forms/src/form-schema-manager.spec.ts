import {provideHttpClientTesting} from '@angular/common/http/testing';
import {EventEmitter} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';
import {AUTH_SERVICE_CONFIG, AuthService, AuthServiceConfig} from '@dino/core/auth';
import {DATA_SERVICE_CONFIG, DataServiceConfig} from '@dino/core/data';
import {getRxStorageMemory} from 'rxdb/plugins/storage-memory';
import {BehaviorSubject, of as obsOf} from 'rxjs';

import {FormSchema, FormSchemaManager, FormSchemaVisibility} from './public_api';
import {UserData, UserGroup} from '@dino/core/users';
import {FormInfo} from './form-info';
import {ajfCustomFunctions} from '../../../e2e-app/src/ajf-custom-functions';
import {NodeVisibility} from '@dino/core/list';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';

let testDbIdx = 0;

function dataServiceConfig(): DataServiceConfig {
  return {
    databaseCreateOptions: {
      name: `dino_data_test_db_${testDbIdx++}`,
      storage: getRxStorageMemory(),
    },
    syncOptions: {
      collection: null,
      replicationIdentifier: 'test-replication',
      url: {http: 'http://dinoServer/v1/graphql', ws: 'ws://dinoServer/v1/graphql'},
      webSocketImpl: WebSocket,
      authErrorMessage: 'Could not verify JWT: JWTExpired',
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
  authenticated: obsOf({auth: true, evt: 'init'}),
  authToken: obsOf('test_auth_token'),
  getUserInfo: () => {
    return {};
  },
  logout: () => obsOf(false),
  logoutEvt: new EventEmitter<void>(),
  resetEvt: obsOf(false),
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
          'conditionalBranches': [{'condition': 'true'}],
        },
      ],
      'parent': 0,
      'nodeType': 3,
      'parentNode': 0,
      'visibility': {'condition': 'true'},
      'conditionalBranches': [{'condition': 'true'}],
    },
  ],
};

export const formSchema: FormSchema = {
  id: '1',
  name: 'test_schema',
  schema: testAjfSchema,
  created_at: '',
  updated_at: '',
  visibility: FormSchemaVisibility.Private,
};

describe('FormSchemaManager', () => {
  let fsm: FormSchemaManager;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        FormSchemaManager,
        {provide: DATA_SERVICE_CONFIG, useValue: dataServiceConfig()},
        {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
        {provide: AuthService, useValue: authServiceMock},
        {provide: Router, useValue: {}},
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
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

  it('should correctly evaluate Relevant Permissions', () => {
    const mockSchema = {
      'nodes': [
        {
          'id': 1,
          'name': '_1',
          'label': 'MOCK SCHEMA',
          'nodes': [
            {
              'id': 101,
              'name': 'first_field',
              'size': 'normal',
              'label': 'First Field',
              'parent': 1,
              'editable': true,
              'nodeType': 0,
              'fieldType': 0,
              'parentNode': 0,
              'validation': {'notEmpty': true, 'conditions': []},
              'visibility': {'condition': 'true'},
              'defaultValue': null,
              'conditionalBranches': [{'condition': 'true'}],
            },
            {
              'id': 102,
              'name': 'second_field',
              'size': 'normal',
              'label': 'Second Field',
              'parent': 101,
              'editable': true,
              'nodeType': 0,
              'fieldType': 0,
              'parentNode': 0,
              'validation': {'notEmpty': true, 'conditions': []},
              'visibility': {
                'condition': `(first_field != null) && (dino_permissions_begin||(isUserInGroup('MockGroup',dino_form_info)&&!isUserInGroup('MockNotGroup',dino_form_info))||dino_permissions_end)`,
              },
              'defaultValue': null,
              'conditionalBranches': [{'condition': 'true'}],
            },
            {
              'id': 103,
              'name': 'third_field',
              'size': 'normal',
              'label': 'Third Field',
              'parent': 102,
              'editable': true,
              'nodeType': 0,
              'fieldType': 0,
              'parentNode': 0,
              'validation': {'notEmpty': true, 'conditions': []},
              'visibility': {
                'condition': `(dino_permissions_begin||(isUserInGroup('NonExistentGroup',dino_form_info))||dino_permissions_end)`,
              },
              'defaultValue': null,
              'conditionalBranches': [{'condition': 'true'}],
            },
          ],
          'parent': 0,
          'nodeType': 3,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'conditionalBranches': [{'condition': 'true'}],
        },
      ],
    };

    const mockGroup: UserGroup = {
      groupName: 'MockGroup',
      user_role_ref_id: '1',
      area_ref_id: [],
      case_ref_id: [],
      location_ref_id: [],
      organization_ref_id: [],
      project_ref_id: [],
      form_status_ref_id: [],
      groupFormSchemaIds: [],
      groupReportSchemaIds: [],
      id: 'mockid',
      created_at: '',
      updated_at: '',
    };

    const mockUser: UserData = {
      id: 'id',
      email: 'test@dino.io',
      full_name: 'Test User',
      user_group_ids: [],
      user_auth_ref_id: '',
      created_at: '',
      updated_at: '',
    };

    const mockFormInfo: FormInfo = {
      status: null,
      allStatuses: [],
      user: null,
      userGroups: null,
      activeUser: mockUser,
      activeUserGroups: [mockGroup],
      createdAt: null,
    };

    const nodesVisibility = fsm.getPermissionsRelevant(mockSchema.nodes, mockFormInfo, {
      isUserInGroup: ajfCustomFunctions['isUserInGroup'],
      isUserInAtLeastOneGroup: ajfCustomFunctions['isUserInAtLeastOneGroup'],
    });

    const expectedNodeVisibility: NodeVisibility[] = [
      {name: '_1', type: 'slide', visible: true},
      {name: 'first_field', type: 'field', visible: true},
      {name: 'second_field', type: 'field', visible: true},
      {name: 'third_field', type: 'field', visible: false},
    ];

    expect(nodesVisibility).not.toBeNull();
    expect(nodesVisibility).toEqual(expectedNodeVisibility);
  });
});
