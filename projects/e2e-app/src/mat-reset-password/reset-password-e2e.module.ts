import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ResetPasswordRoutingModule} from './reset-password-e2e-routing.module';
import {ResetPasswordModule as DinoResetPasswordModule} from '@dino/material/reset-password';
import {MatResetPasswordE2E} from './reset-password-e2e.component';

@NgModule({
  declarations: [MatResetPasswordE2E],
  imports: [CommonModule, DinoResetPasswordModule, ResetPasswordRoutingModule],
})
export class MaterialResetPasswordE2eModule {}
