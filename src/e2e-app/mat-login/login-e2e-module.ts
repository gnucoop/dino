import { CommonModule } from '@angular/common';
import {NgModule} from '@angular/core';
import {AuthModule} from '@dewco/core/auth';
import {LoginModule} from '@dewco/material/login';
// import {Observable, of as obsOf} from 'rxjs';
// import {delay} from 'rxjs/operators';

import {MatLoginE2E} from './login-e2e';

// const authServiceMock = {
//   login(credentials: Credentials): Observable<boolean> {
//     if (credentials.email == 'user@dewco.io' && credentials.password == 'dewco') {
//       return obsOf(true).pipe(delay(1000));
//     }
//     return obsOf(false).pipe(delay(1000));
//   }
// };

@NgModule({
  declarations: [
    MatLoginE2E,
  ],
  imports: [
    AuthModule,
    CommonModule,
    LoginModule,    
  ],
  // providers: [
  //   {provide: AuthService, useValue: authServiceMock},
  // ],
})
export class MaterialLoginE2eModule {
}
