import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EditReportComponent} from './components/edit-report.component';

const routes: Routes = [
  {
    path: ':report_id',
    component: EditReportComponent,
    data: {breadcrumbs: null},
  },
  {
    path: 'details/:report_id',
    component: EditReportComponent,
    data: {isDetails: true, breadcrumbs: null},
  },
];


@NgModule({imports: [RouterModule.forChild(routes)], exports: [RouterModule]})
export class EditReportRoutingModule {
}
