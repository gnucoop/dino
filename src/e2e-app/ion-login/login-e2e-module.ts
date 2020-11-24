import {NgModule} from '@angular/core';
import {LoginModule} from '@dewco/ionic/login';

import {IonLoginE2E} from './login-e2e';

@NgModule({
  declarations: [
    IonLoginE2E,
  ],
  imports: [
    LoginModule,
  ],
})
export class IonicLoginE2eModule {
}
