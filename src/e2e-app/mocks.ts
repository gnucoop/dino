import {Injectable} from '@angular/core';
import {AuthServiceConfig, Credentials, User} from '@dewco/core/auth';
import {BehaviorSubject, Observable, of as obsOf} from 'rxjs';
import {delay, map, shareReplay} from 'rxjs/operators';

import {additionalConfig} from './mockconfig';


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

export class MockBreakpointObserver {
  small = obsOf(additionalConfig.isSmallScreen);
  large = obsOf(!additionalConfig.isSmallScreen);
}

const dummyUser: User = {
  id: 'userid',
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

@Injectable()
export class AuthServiceMock {
  authenticated: BehaviorSubject<boolean>;
  authToken: Observable<string|undefined>;
  private _authConfig: BehaviorSubject<AuthServiceConfig>;
  get authConfig(): AuthServiceConfig {
    return this._authConfig.value;
  }
  resetEvt: Observable<boolean> = obsOf(false);
  constructor() {
    this.authenticated = new BehaviorSubject<boolean>(false);
    this._authConfig = new BehaviorSubject<AuthServiceConfig>(authMockConfig);
    this.authToken = this.authenticated.pipe(
        map(auth => auth ? 'test_auth_token' : undefined),
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
