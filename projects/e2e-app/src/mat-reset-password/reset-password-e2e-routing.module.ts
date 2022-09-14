import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MatResetPasswordE2E} from './reset-password-e2e.component';

const routes: Routes = [{path: '', component: MatResetPasswordE2E, data: {breadcrumbs: null}}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResetPasswordRoutingModule {}
