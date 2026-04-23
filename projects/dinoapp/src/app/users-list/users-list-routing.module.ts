import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersList} from './components/users-list.component';

const routes: Routes = [{path: '', component: UsersList, data: {breadcrumbs: null}}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersListRoutingModule {}
