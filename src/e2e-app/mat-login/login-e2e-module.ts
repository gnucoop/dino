import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {AuthModule} from '@dewco/core/auth';
import {LoginModule} from '@dewco/material/login';

import {MatLoginE2E} from './login-e2e';

@NgModule({
  declarations: [
    MatLoginE2E,
  ],
  imports: [
    AuthModule,
    CommonModule,
    LoginModule,
    MatIconModule,
    MatSlideToggleModule,
  ],
})
export class MaterialLoginE2eModule {
}
