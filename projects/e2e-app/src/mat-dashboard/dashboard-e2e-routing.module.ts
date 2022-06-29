import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MatDashboardE2E} from './dashboard-e2e.component';
const routes: Routes = [{path: '', component: MatDashboardE2E, data: {breadcrumbs: null}}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
