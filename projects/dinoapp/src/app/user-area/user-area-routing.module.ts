import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserAreaComponent} from './components/user-area.component';

const routes: Routes = [
  {path: '', redirectTo: 'password', pathMatch: 'full'},
  // One component for every tab rather than a child route each: the router then reuses
  // the same instance across tabs, so the forms keep what the user has typed.
  {path: ':tab', component: UserAreaComponent, data: {breadcrumbs: null}},
];

@NgModule({imports: [RouterModule.forChild(routes)], exports: [RouterModule]})
export class UserAreaRoutingModule {}
