import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthService, Credentials, User} from '@dewco/core/auth';
import {BehaviorSubject, Observable, of as obsOf} from 'rxjs';
import {delay} from 'rxjs/operators';

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
    this.authenticated = new BehaviorSubject<boolean>(false);
  }
  login(credentials: Credentials): Observable<boolean> {
    if (credentials.email == 'user@dewco.io' && credentials.password == 'dewco') {
      this.authenticated.next(true);
      return obsOf(true).pipe(delay(1000));
    }
    return obsOf(false).pipe(delay(1000));
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

@Injectable({providedIn: 'root'})
export class AuthGuardMock implements CanActivate {
  constructor(private _auth: AuthService) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):
      Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    return this._auth.authenticated;
  }
}
