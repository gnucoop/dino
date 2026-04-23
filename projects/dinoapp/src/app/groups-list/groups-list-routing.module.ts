import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GroupsList} from './components/groups-list.component';

const routes: Routes = [{path: '', component: GroupsList, data: {breadcrumbs: null}}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupsListRoutingModule {}
