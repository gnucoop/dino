import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MatNotificationsE2E} from './notifications-e2e.component';

const routes: Routes = [{path: '', component: MatNotificationsE2E, data: {breadcrumbs: null}}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationsRoutingModule {}
