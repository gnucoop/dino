import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {LoginModule as DinoLoginModule} from '@dino/material/login';
import {ThemeSwitchModule} from '@dino/material/theme-switch';
import {TranslocoModule} from '@ngneat/transloco';

import {LoginComponent} from './components/login/login.component';
import {LoginRoutingModule} from './login-routing.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    DinoLoginModule,
    LoginRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatSnackBarModule,
    ThemeSwitchModule,
    TranslocoModule,
  ],
})
export class LoginModule {}
