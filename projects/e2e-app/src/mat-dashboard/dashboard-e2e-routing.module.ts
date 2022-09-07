import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MatDashboardMenuE2E} from './dashboard-menu-e2e.component';
import {additionalConfig} from '../mockconfig';
import {MatDashboardReportE2E} from './dashboard-report-e2e.component';
const routes: Routes = [
  {
    path: '',
    component:
      additionalConfig.dashboardType === 'report' ? MatDashboardReportE2E : MatDashboardMenuE2E,
    data: {breadcrumbs: null},
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
