import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersComponent} from './components/users.component';

const routes: Routes = [
  {
    path: 'list',
    loadChildren: () => import('../users-list/users-list.module').then(m => m.UsersListModule),
    data: {breadcrumbs: [{label: 'List', url: 'users/list', icon: 'groups'}]},
  },
  {
    path: 'groups',
    loadChildren: () => import('../groups-list/groups-list.module').then(m => m.GroupsListModule),
    data: {breadcrumbs: [{label: 'Groups', url: 'users/groups', icon: 'badge'}]},
  },
  {
    path: '',
    component: UsersComponent,
    data: {breadcrumbs: null},
  },
];

@NgModule({imports: [RouterModule.forChild(routes)], exports: [RouterModule]})
export class UsersRoutingModule {}
