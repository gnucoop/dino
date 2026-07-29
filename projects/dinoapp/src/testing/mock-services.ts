import {EventEmitter, Injectable} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {
  AuthenticationEvent,
  AuthEvt,
  AuthServiceConfig,
  Credentials,
  DEFAULT_AUTH_OPTIONS,
  User,
} from '@dino/core/auth';
import {
  CollectionSyncParams,
  DataService,
  PermissionContext,
  PermissionContextService,
  PermissionGroup,
} from '@dino/core/data';
import {UserData, UserDataManager, UserGroup, UserGroupManager} from '@dino/core/users';
import {RxCollection, RxDocument} from 'rxdb';
import {BehaviorSubject, Observable, of as obsOf} from 'rxjs';
import {delay, map, shareReplay, tap} from 'rxjs/operators';

export const authMockConfig: AuthServiceConfig = {
  host: '',
  applicationId: '',
  apiKey: '',
  retryRefreshTime: 3000,
  retryAttemptsMax: 1,
  failedAuthRedirect: 'login',
};

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
export const userGroupMock: UserGroup = {
  id: '',
  created_at: '',
  updated_at: '',
  groupName: 'admin',
  user_role_ref_id: 'admin',
  area_ref_id: ['all'],
  case_ref_id: ['all'],
  location_ref_id: ['all'],
  organization_ref_id: ['all'],
  project_ref_id: ['all'],
  form_status_ref_id: ['all'],
  groupFormSchemaIds: ['all'],
  groupReportSchemaIds: ['all'],
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
  loginEvt: EventEmitter<void> = new EventEmitter<void>();
  tokenRefreshedEvt: EventEmitter<void> = new EventEmitter<void>();
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
  getAuthToken(): string | null {
    return localStorage.getItem(this._getAuthTokenLocaleStorageKey());
  }
  getRefreshToken(): string | null {
    return 'test_refresh_token';
  }
  hasValidAuthToken(): boolean {
    return true;
  }
  private _getAuthTokenLocaleStorageKey(): string {
    return this._authConfig.value.authTokenLocalStorageKey || DEFAULT_AUTH_OPTIONS.authTokenKey;
  }
}

@Injectable()
export class DataServiceMock extends DataService {
  override firstReplicationComplete: Observable<boolean> = obsOf(true);
  protected override _initSync(): void {}
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
export class UserGroupManagerMock extends UserGroupManager {
  override isActiveUserAdmin() {
    this.addToContext({user_metrics: userMetricsMock});
    this.addToContext({user_permissions: userPrivilegesMock});
    return obsOf(true);
  }
  override getGroupsMetricsByType(_metricType: string): Observable<string[]> {
    return obsOf(['all']);
  }
  override getActiveUserGroups() {
    return obsOf([userGroupMock as RxDocument<UserGroup>]);
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
