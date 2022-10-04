import {EventEmitter, Injectable} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {AuthenticationEvent, AuthEvt, AuthServiceConfig, Credentials, User} from '@dino/core/auth';
import {
  CollectionSyncParams,
  DataService,
  PermissionContext,
  PermissionContextService,
  PermissionGroup,
} from '@dino/core/data';
import {SyncManager} from '@dino/core/sync';
import {UserData, UserDataManager, UserGroupManager} from '@dino/core/users';
import {RxCollection} from 'rxdb';
import {BehaviorSubject, Observable, of as obsOf} from 'rxjs';
import {delay, map, shareReplay, tap} from 'rxjs/operators';

import {additionalConfig} from './mockconfig';

/**
 * Local Backend
 */
export const syncGraphQLUrl = 'http://localhost:8080/v1/graphql';
export const wsUrl = 'ws://localhost:8080/v1/graphql';
export const instanceName = 'local_dev';
export const live = true;

/**
 * NHost dev backend
 */
// export const syncGraphQLUrl = 'https://sehdprpmtgoonqyxyuhk.nhost.run/v1/graphql';
// export const wsUrl = 'wss://sehdprpmtgoonqyxyuhk.nhost.run/v1/graphql';
// export const instanceName = 'nhost_dev';

export const authErrorMessage = 'Could not verify JWT: JWTExpired';

export const authMockConfig: AuthServiceConfig = {
  host: '',
  applicationId: '',
  apiKey: '',
  signUp: true,
  retryRefreshTime: 3000,
  retryAttemptsMax: 1,
  failedAuthRedirect: 'login',
};

export class MockBreakpointObserver {
  small = obsOf(additionalConfig.isSmallScreen);
  large = obsOf(!additionalConfig.isSmallScreen);
}

const dummyUser: User = {
  id: 'userid',
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

export const userMetricsMock = {
  'area': ['all'],
  'case': ['all'],
  'location': ['all'],
  'organization': ['all'],
  'project': ['all'],
};
export const userPrivilegesMock: {[key: string]: PermissionGroup} = {
  'admin': {
    'actions': {
      'form_data': ['all'],
      'form_schema': ['all'],
      'report_data': ['all'],
      'report_schema': ['all'],
    },
    'form_status': ['all'],
    'form_schema': ['all'],
    'report_schema': ['all'],
  },
};

@Injectable()
export class AuthServiceMock {
  config: AuthServiceConfig;
  authenticated: BehaviorSubject<AuthenticationEvent>;
  authToken: Observable<string | undefined>;
  private _authConfig: BehaviorSubject<AuthServiceConfig>;
  get authConfig(): AuthServiceConfig {
    return this._authConfig.value;
  }
  resetEvt: Observable<boolean> = obsOf(false);
  logoutEvt: EventEmitter<void> = new EventEmitter<void>();
  constructor(private _router: Router) {
    this._router.events
      .pipe(
        tap(event => {
          if (event instanceof NavigationStart) {
            if (event.url.includes('login')) {
              this.authenticated.next({auth: false, evt: 'no auth token'});
            }
          }
        }),
      )
      .subscribe();
    this.config = authMockConfig;
    this.authenticated = new BehaviorSubject<AuthenticationEvent>({auth: true, evt: 'login'});
    this._authConfig = new BehaviorSubject<AuthServiceConfig>(authMockConfig);
    this.authToken = this.authenticated.pipe(
      map(auth => (auth.auth ? 'test_auth_token' : undefined)),
      shareReplay(1),
    );
  }
  resetAuth(): void {}
  login(credentials: Credentials): Observable<boolean> {
    if (credentials.email == 'dino' && credentials.password == 'dino') {
      this.authenticated.next({auth: true, evt: 'login'});
      return obsOf(true).pipe(delay(1000));
    }
    return obsOf(false).pipe(delay(1000));
  }
  logout(): Observable<boolean> {
    this.authenticated.next({auth: false, evt: 'logout'});
    return obsOf(true);
  }
  getUserInfo(): User {
    return dummyUser;
  }
  checkToken(): Observable<{token: boolean; evt: AuthEvt}> {
    return obsOf({token: true, evt: 'init'});
  }
  refreshToken(): Observable<boolean> {
    return obsOf(true);
  }
}
@Injectable()
export class DataServiceMock extends DataService {
  override firstReplicationComplete: Observable<boolean> = obsOf(true);
  protected override _setupCollectionSync(
    _collection: RxCollection<any, {}, {}, {}>,
    _params: CollectionSyncParams,
    _token: string,
  ): void {}
}

@Injectable()
export class PermissionContextServiceMock extends PermissionContextService {
  override fullContext: BehaviorSubject<PermissionContext | null> =
    new BehaviorSubject<PermissionContext | null>({
      user: dummyUser,
      user_data: {},
      user_form_schemas: new Set<string>(['all']),
      user_report_schemas: new Set<string>(['all']),
      user_form_statuses: new Set<string>(['all']),
      user_metrics: userMetricsMock,
      user_permissions: userPrivilegesMock,
    });
}

@Injectable()
export class SyncManagerMock extends SyncManager {
  override initializeMainCollections(): Observable<boolean[]> {
    return obsOf([]);
  }
  override initializeContextualCollections(): Observable<boolean[]> {
    return obsOf([]);
  }
}

@Injectable()
export class UserGroupManagerMock extends UserGroupManager {
  override isActiveUserAdmin() {
    this.addToContext({user_metrics: userMetricsMock});
    this.addToContext({user_permissions: userPrivilegesMock});
    return obsOf(true);
  }
  override getGroupsMetricsByType(_metricType: string): Observable<string[]> {
    return obsOf(['all']);
  }
}

const userDataMock: UserData = {
  id: '',
  email: 'test@dino.com',
  full_name: 'Test user',
  user_group_ids: [],
  created_at: '',
  updated_at: '',
  user_auth_ref_id: null,
};

@Injectable()
export class UserDataManagerMock extends UserDataManager {
  override getActiveUserData(): Observable<UserData | null> {
    return obsOf(userDataMock);
  }
}
