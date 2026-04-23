import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ResetPasswordComponent} from './components/reset-password.component';

const routes: Routes = [
  {path: '', component: ResetPasswordComponent, data: {breadcrumbs: null, isReportData: true}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResetPasswordRoutingModule {}
