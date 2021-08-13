import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {LoginModule} from '@dewco/material/login';

import {MatLoginE2E} from './login-e2e';

@NgModule({
  declarations: [
    MatLoginE2E,
  ],
  imports: [
    CommonModule,
    LoginModule,
    MatIconModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
})
export class MaterialLoginE2eModule {
}
