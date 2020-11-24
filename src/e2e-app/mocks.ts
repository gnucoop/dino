import {AuthService, Credentials, User} from '@dewco/core/auth';
import {Observable, of as obsOf} from 'rxjs';
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

export const authServiceMock = {
  login(credentials: Credentials): Observable<boolean> {
    if (credentials.email == 'user@dewco.io' && credentials.password == 'dewco') {
      return obsOf(true).pipe(delay(1000));
    }
    return obsOf(false).pipe(delay(1000));
  },
  authenticated: obsOf(true),
  getUserInfo: () => {
    return dummyUser;
  },
} as unknown as AuthService;
