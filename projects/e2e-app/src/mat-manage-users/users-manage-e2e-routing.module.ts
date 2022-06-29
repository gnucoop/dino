import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MatUsersListE2E} from './users-list-e2e.component';

const routes: Routes = [{path: '', component: MatUsersListE2E, data: {breadcrumbs: null}}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersManageRoutingModule {}
