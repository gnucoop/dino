import {Injectable} from '@angular/core';
import {Credentials, User} from '@dewco/core/auth';
import {BehaviorSubject, Observable, of as obsOf} from 'rxjs';
import {delay} from 'rxjs/operators';


export const syncGraphQLUrl = 'http://localhost:8080/v1/graphql';
export const wsUrl = 'ws://localhost:8080/v1/graphql';
export const authErrorMessage = 'Could not verify JWT: JWTExpired';

export class MockBreakpointObserver {
  small = obsOf(false);
  large = obsOf(true);
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
  constructor() {
    this.authenticated = new BehaviorSubject<boolean>(true);
  }
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
  checkToken(): boolean {
    return true;
  }
  refreshToken(): Observable<boolean> {
    return obsOf(true);
  }
}
