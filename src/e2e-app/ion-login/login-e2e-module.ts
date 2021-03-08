import {NgModule} from '@angular/core';
import {AuthService} from '@dewco/core/auth';
import {LoginModule} from '@dewco/ionic/login';

import {IonLoginE2E} from './login-e2e';

@NgModule({
  declarations: [
    IonLoginE2E,
  ],
  imports: [
    LoginModule,
  ],
  providers: [
    AuthService,
  ],
})
export class IonicLoginE2eModule {
}
