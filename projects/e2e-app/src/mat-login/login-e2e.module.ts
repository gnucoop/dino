import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatLegacySelectModule as MatSelectModule} from '@angular/material/legacy-select';
import {MatLegacySlideToggleModule as MatSlideToggleModule} from '@angular/material/legacy-slide-toggle';
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
