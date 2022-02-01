import {TestBed} from '@angular/core/testing';
import {AUTH_SERVICE_CONFIG, AuthService, AuthServiceConfig, User} from '@dino/core/auth';
import {DATA_SERVICE_CONFIG, DataServiceConfig} from '@dino/core/data';
import * as pouchdbAdapterMemory from 'pouchdb-adapter-memory';
import {addPouchPlugin, getRxStoragePouch, RxDocument} from 'rxdb';
import {BehaviorSubject, firstValueFrom, of as obsOf} from 'rxjs';
import {take} from 'rxjs/operators';

import {UserGroupManager, UserDataManager, UsersModule} from '.';
import {UserData} from './user-data';

const dummyUserData: RxDocument<UserData> = {
  id: 'dino_user_id',
  email: 'user@dino.gnu',
  full_name: 'dino_user',
  user_group_ids: ['1', '2', '3'],
  created_at: '',
  updated_at: '',
} as RxDocument<UserData>;

const dummyUser: User = {
  id: 'dino_user_id',
  email: 'user@dino.gnu',
  firstName: 'dummy',
  lastName: 'dino',
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
  registrations: [],
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
  authenticated: new BehaviorSubject<boolean>(true),
  authToken: obsOf('test_auth_token'),
  authConfig: authServiceConfig,
  resetEvt: obsOf(true),
  getUserInfo: () => {
    return dummyUser;
  },
} as unknown as AuthService;

const userDataManagerMock = {
  getActiveUserData: () => obsOf(dummyUserData),
} as unknown as UserDataManager;

let testDbIdx = 0;
const serverUrl = 'http://dinoServer/v1/graphql';
const wsServerUrl = 'ws://dinoServer';
const wsUrl = `${wsServerUrl}/v1/graphql`;

addPouchPlugin(pouchdbAdapterMemory);
function dataServiceConfig(): DataServiceConfig {
  return {
    databaseCreateOptions: {
      name: `dino_usermanager_test_db_${testDbIdx++}`,
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

describe('User Data Manager', () => {
  let userDataManager: UserDataManager;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [UsersModule],
      providers: [
        {provide: AuthService, useValue: authServiceMock},
        {provide: DATA_SERVICE_CONFIG, useValue: dataServiceConfig()},
        {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
      ],
    });
    userDataManager = TestBed.inject(UserDataManager);
  });

  it('should retrieve the user model by its UUID', async () => {
    const getSpy = spyOn(userDataManager, 'query').and.returnValue(obsOf([dummyUserData]));
    await firstValueFrom(userDataManager.getActiveUserData());
    const expectedQuerySelector = {selector: {user_auth_ref_id: {$eq: dummyUser.id}}};
    expect(getSpy).toHaveBeenCalledTimes(1);
    expect(getSpy).toHaveBeenCalledWith(expectedQuerySelector);
  });
});

describe('User Group Manager', () => {
  let userGroupManager: UserGroupManager;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [UsersModule],
      providers: [
        {provide: UserDataManager, useValue: userDataManagerMock},
        {provide: AuthService, useValue: authServiceMock},
        {provide: DATA_SERVICE_CONFIG, useValue: dataServiceConfig()},
        {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
      ],
    });
    userGroupManager = TestBed.inject(UserGroupManager);
  });

  it('should retrieve the active user groups', async () => {
    const querySpy = spyOn(userGroupManager, 'query').and.callThrough();
    await firstValueFrom(userGroupManager.getActiveUserGroups().pipe(take(1)));
    const expectedQuerySelector = {selector: {id: {$in: dummyUserData.user_group_ids}}};
    expect(querySpy).toHaveBeenCalledTimes(1);
    expect(querySpy).toHaveBeenCalledWith(expectedQuerySelector);
  });
});
