import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GroupEditorPage} from './components/group-editor-page.component';
import {GroupsList} from './components/groups-list.component';

const routes: Routes = [
  {path: '', component: GroupsList, data: {breadcrumbs: null}},
  {
    path: 'create',
    component: GroupEditorPage,
    data: {breadcrumbs: [{label: 'Create group', url: 'users/groups/create'}]},
  },
  {
    path: ':id/edit',
    component: GroupEditorPage,
    data: {breadcrumbs: [{label: 'Edit group'}]},
  },
  {
    path: ':id/view',
    component: GroupEditorPage,
    data: {isView: true, breadcrumbs: [{label: 'View group'}]},
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupsListRoutingModule {}
