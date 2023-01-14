import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {UsersModule as DinoUsersModule} from '@dino/core/users';
import {LoginModule} from '@dino/material/login';

import {MatLoginE2E} from './login-e2e';
import {LoginRoutingModule} from './login-e2e-routing.module';

@NgModule({
  declarations: [MatLoginE2E],
  imports: [
    CommonModule,
    LoginModule,
    LoginRoutingModule,
    MatIconModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    DinoUsersModule,
  ],
})
export class MaterialLoginE2eModule {}
