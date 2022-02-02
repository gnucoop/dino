import {Injectable} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {AuthServiceConfig, Credentials, User} from '@dino/core/auth';
import {UserData, UserDataManager, UserGroupManager} from '@dino/core/users';
import {BehaviorSubject, Observable, of as obsOf} from 'rxjs';
import {delay, map, shareReplay, tap} from 'rxjs/operators';

import {additionalConfig} from './mockconfig';

/**
 * Local Backend
 */
export const syncGraphQLUrl = 'http://localhost:8080/v1/graphql';
export const wsUrl = 'ws://localhost:8080/v1/graphql';
export const instanceName = 'local_dev';

/**
 * NHost dev backend
 */
// export const syncGraphQLUrl = 'https://ktaskcckfnzewxcsyrvu.nhost.run/v1/graphql';
// export const wsUrl = 'wss://ktaskcckfnzewxcsyrvu.nhost.run/v1/graphql';
// export const instanceName = 'nhost_dev';

export const authErrorMessage = 'Could not verify JWT: JWTExpired';

export const authMockConfig: AuthServiceConfig = {
  host: '',
  applicationId: '',
  apiKey: '',
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

@Injectable()
export class AuthServiceMock {
  authenticated: BehaviorSubject<boolean>;
  authToken: Observable<string | undefined>;
  private _authConfig: BehaviorSubject<AuthServiceConfig>;
  get authConfig(): AuthServiceConfig {
    return this._authConfig.value;
  }
  resetEvt: Observable<boolean> = obsOf(false);
  constructor(private _router: Router) {
    this._router.events
      .pipe(
        tap(event => {
          if (event instanceof NavigationStart) {
            if (event.url.includes('login')) {
              this.authenticated.next(false);
            }
          }
        }),
      )
      .subscribe();
    this.authenticated = new BehaviorSubject<boolean>(true);
    this._authConfig = new BehaviorSubject<AuthServiceConfig>(authMockConfig);
    this.authToken = this.authenticated.pipe(
      map(auth => (auth ? 'test_auth_token' : undefined)),
      shareReplay(1),
    );
  }
  resetAuth(): void {}
  login(credentials: Credentials): Observable<boolean> {
    if (credentials.email == 'dino' && credentials.password == 'dino') {
      this.authenticated.next(true);
      return obsOf(true).pipe(delay(1000));
    }
    return obsOf(false).pipe(delay(1000));
  }
  logout(): Observable<boolean> {
    this.authenticated.next(false);
    return obsOf(true);
  }
  getUserInfo(): User {
    return dummyUser;
  }
  checkToken(): Observable<boolean> {
    return obsOf(true);
  }
  refreshToken(): Observable<boolean> {
    return obsOf(true);
  }
}

@Injectable()
export class UserGroupManagerMock extends UserGroupManager {
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
      },
    };
    this.addToContext({user_metrics: userMetrics});
    this.addToContext({user_permissions: userPrivileges});
    return obsOf(true);
  }
  override getGroupsMetricsByType(metricType: string): Observable<string[]> {
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
