import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MatUsersE2E} from './users-e2e.component';

const routes: Routes = [
  {
    path: 'list',
    loadChildren: () =>
      import('../mat-manage-users/users-manage-e2e.module').then(
        m => m.MaterialUsersManageE2eModule,
      ),
    data: {breadcrumbs: [{label: 'List', url: 'users/list', icon: 'groups'}]},
  },
  {
    path: 'groups',
    loadChildren: () =>
      import('../mat-groups/groups-e2e.module').then(m => m.MaterialGroupsE2eModule),
    data: {breadcrumbs: [{label: 'Groups', url: 'users/groups', icon: 'badge'}]},
  },
  {
    path: '',
    component: MatUsersE2E,
    data: {breadcrumbs: null},
  },
];

@NgModule({imports: [RouterModule.forChild(routes)], exports: [RouterModule]})
export class UsersRoutingModule {}
