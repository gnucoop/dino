import {EventEmitter, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {RxDocument} from 'rxdb';
import {
  AuthenticationEvent,
  AuthEvt,
  AuthServiceConfig,
  Credentials,
  User,
} from '@dino/core/auth';
import {PermissionContext, PermissionContextService} from '@dino/core/data';
import {UserData, UserDataManager, UserGroup, UserGroupManager} from '@dino/core/users';
import {BehaviorSubject, Observable, of as obsOf} from 'rxjs';
import {delay, map, shareReplay} from 'rxjs/operators';

export const syncGraphQLUrl = 'http://localhost:8080/v1/graphql';
export const wsUrl = 'ws://localhost:8080/v1/graphql';
export const authErrorMessage = 'Could not verify JWT: JWTExpired';

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
  firstName: 'admin',
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

const userDataMock: UserData = {
  id: '',
  email: 'admin@dino.com',
  full_name: 'Admin user',
  user_group_ids: [],
  created_at: '',
  updated_at: '',
  user_auth_ref_id: '',
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
export class AuthServiceBackendless {
  authenticated: BehaviorSubject<AuthenticationEvent> = new BehaviorSubject<AuthenticationEvent>({
    auth: true,
    evt: 'init',
  });
  authToken: Observable<string | undefined>;
  private _authConfig: BehaviorSubject<AuthServiceConfig>;
  readonly config: AuthServiceConfig;
  get authConfig(): AuthServiceConfig {
    return this._authConfig.value;
  }
  resetEvt: Observable<boolean> = obsOf(false);
  logoutEvt: Observable<boolean> = obsOf(false);
  tokenRefreshedEvt: EventEmitter<void> = new EventEmitter<void>();
  constructor(private _router: Router) {
    this.config = authMockConfig;
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
    return 'test_auth_token';
  }
  getRefreshToken(): string | null {
    return 'test_refresh_token';
  }
  hasValidAuthToken(): boolean {
    return true;
  }
}

@Injectable()
export class UserGroupManagerBackendless extends UserGroupManager {
  override isActiveUserAdmin() {
    const userMetrics = {
      'area': ['all'],
      'case': ['all'],
      'location': ['all'],
      'organization': ['all'],
      'project': ['all'],
    };
    const userPrivileges = {
      'admin': {
        'actions': {
          'form_data': ['all'],
          'form_schema': ['all'],
          'report_data': ['all'],
          'report_schema': ['all'],
        },
        'form_schema': ['all'],
        'report_schema': ['all'],
        'form_status': ['all'],
      },
    };
    this.addToContext({user_data: userDataMock});
    this.addToContext({user_form_schemas: new Set(['all'])});
    this.addToContext({user_report_schemas: new Set(['all'])});
    this.addToContext({user_form_statuses: new Set(['all'])});
    this.addToContext({user_metrics: userMetrics});
    this.addToContext({user_permissions: userPrivileges});
    return obsOf(true);
  }

  override getGroupsMetricsByType(_metricType: string): Observable<string[]> {
    return obsOf(['all']);
  }

  override getActiveUserGroups() {
    return obsOf([userGroupMock as RxDocument<UserGroup>]);
  }
}
@Injectable()
export class UserDataManagerBackendless extends UserDataManager {
  override getActiveUserData(): Observable<UserData | null> {
    return obsOf(userDataMock);
  }
}

@Injectable()
export class PermissionContextServiceBackendless extends PermissionContextService {
  override fullContext = new BehaviorSubject<PermissionContext | null>({
    user: dummyUser,
    user_data: userDataMock,
    user_form_schemas: new Set<string>(['all']),
    user_report_schemas: new Set<string>(['all']),
    user_form_statuses: new Set<string>(['all']),
    user_metrics: {
      'area': ['all'],
      'case': ['all'],
      'location': ['all'],
      'organization': ['all'],
      'project': ['all'],
    },
    user_permissions: {
      'admin': {
        'actions': {
          'form_data': ['all'],
          'form_schema': ['all'],
          'report_data': ['all'],
          'report_schema': ['all'],
        },
        'form_schema': ['all'],
        'report_schema': ['all'],
        'form_status': ['all'],
      },
    },
  });
}
