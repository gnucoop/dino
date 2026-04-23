import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReportsListComponent} from './components/reports-list.component';

const routes: Routes = [{path: '', component: ReportsListComponent, data: {breadcrumbs: null, isReportData: true}}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsListRoutingModule {}
