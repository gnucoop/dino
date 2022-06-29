import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MatGroupsListE2E} from './groups-e2e-list.component';

const routes: Routes = [{path: '', component: MatGroupsListE2E, data: {breadcrumbs: null}}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupsRoutingModule {}
