import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotificationsListComponent} from './components/notifications-list.component';

const routes: Routes = [
  {path: '', component: NotificationsListComponent, data: {breadcrumbs: null}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationsListRoutingModule {}
