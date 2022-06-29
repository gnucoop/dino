import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MatReportsListE2E} from './reports-list-e2e';

const routes: Routes = [
  {path: '', component: MatReportsListE2E, data: {breadcrumbs: null, isReportData: true}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsListRoutingModule {}
