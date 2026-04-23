import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardMenuComponent} from './components/dashboard/dashboard-menu.component';
import {DashboardReportComponent} from './components/dashboard/dashboard-report.component';
import {environment} from 'src/environments/environment';
const routes: Routes = [
  {
    path: '',
    component:
      environment.layoutConfig.dashboardType === 'report'
        ? DashboardReportComponent
        : DashboardMenuComponent,
    data: {breadcrumbs: null},
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
