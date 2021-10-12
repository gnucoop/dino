import {TestBed} from '@angular/core/testing';
import {AUTH_SERVICE_CONFIG, AuthService, AuthServiceConfig, User} from '@dewco/core/auth';
import {DATA_SERVICE_CONFIG, DataServiceConfig} from '@dewco/core/data';
import * as pouchdbAdapterMemory from 'pouchdb-adapter-memory';
import {addPouchPlugin, getRxStoragePouch} from 'rxdb';
import {of as obsOf} from 'rxjs';
import {take} from 'rxjs/operators';

import {UserGroupManager, UserModelManager, UsersModule} from '.';
import {UserModel} from './user-model';

const dummyUserModel: UserModel = {
  id: 'dino_user_id',
  email: 'user@dewco.gnu',
  full_name: 'dino_user',
  user_group_ids: ['1', '2', '3'],
  created_at: '',
  updated_at: '',
};

const dummyUser: User = {
  id: 'dino_user_id',
  email: 'user@dewco.gnu',
  firstName: 'dummy',
  lastName: 'dewco',
  active: true,
  verified: true,
  tenantId: '1',
  insertInstant: 1,
  lastLoginInstant: 1,
  passwordChangeRequired: false,
  passwordLastUpdateInstant: 1,
  twoFactorEnabled: false,
  twoFactorDelivery: 'None',
  usernameStatus: 'ACTIVE',
  registrations: []
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
  authenticated: obsOf(true),
  authToken: obsOf('test_auth_token'),
  authConfig: authServiceConfig,
  resetEvt: obsOf(true),
  getUserInfo: () => {
    return dummyUser;
  },
} as unknown as AuthService;

const userModelManagerMock = {
  getActiveUserModel: () => obsOf(dummyUserModel),
} as unknown as UserModelManager;

let testDbIdx = 0;
const serverUrl = 'http://dewcoServer/v1/graphql';
const wsServerUrl = 'ws://dewcoServer';
const wsUrl = `${wsServerUrl}/v1/graphql`;

addPouchPlugin(pouchdbAdapterMemory);
function dataServiceConfig(): DataServiceConfig {
  return {
    databaseCreateOptions: {
      name: `dewco_usermanager_test_db_${testDbIdx++}`,
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
}

describe('User Model Manager', () => {
  let userModelManager: UserModelManager;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        UsersModule,
      ],
      providers: [
        {provide: AuthService, useValue: authServiceMock},
        {provide: DATA_SERVICE_CONFIG, useValue: dataServiceConfig()},
        {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
      ],
    });
    userModelManager = TestBed.inject(UserModelManager);
  });

  it('should retrieve the user model by its UUID', async () => {
    const getSpy = spyOn(userModelManager, 'get').and.callThrough();
    await userModelManager.getActiveUserModel().toPromise();
    expect(getSpy).toHaveBeenCalledTimes(1);
    expect(getSpy).toHaveBeenCalledWith(dummyUserModel.id);
  });
});

describe('User Group Manager', () => {
  let userGroupManager: UserGroupManager;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        UsersModule,
      ],
      providers: [
        {provide: UserModelManager, useValue: userModelManagerMock},
        {provide: AuthService, useValue: authServiceMock},
        {provide: DATA_SERVICE_CONFIG, useValue: dataServiceConfig()},
        {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
      ],
    });
    userGroupManager = TestBed.inject(UserGroupManager);
  });

  it('should retrieve the active user groups', async () => {
    const querySpy = spyOn(userGroupManager, 'query').and.callThrough();
    await userGroupManager.getActiveUserGroups().pipe(take(1)).toPromise();
    const expectedQuerySelector = {selector: {id: {$in: dummyUserModel.user_group_ids}}};
    expect(querySpy).toHaveBeenCalledTimes(1);
    expect(querySpy).toHaveBeenCalledWith(expectedQuerySelector);
  });
});
