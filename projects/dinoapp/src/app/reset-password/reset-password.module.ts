import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ResetPasswordRoutingModule} from './reset-password-routing.module';
import {ResetPasswordModule as DinoResetPasswordModule} from '@dino/material/reset-password';
import {ResetPasswordComponent} from './components/reset-password.component';
@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [CommonModule, DinoResetPasswordModule, ResetPasswordRoutingModule],
})
export class ResetPasswordModule {}
