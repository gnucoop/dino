import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MatEditReportE2E} from './edit-report-e2e.component';

const routes: Routes = [
  {
    path: ':report_id',
    component: MatEditReportE2E,
    data: {breadcrumbs: null},
  },
  {
    path: 'details/:report_id',
    component: MatEditReportE2E,
    data: {isDetails: true, breadcrumbs: null},
  },
];

@NgModule({imports: [RouterModule.forChild(routes)], exports: [RouterModule]})
export class EditReportRoutingModule {}
