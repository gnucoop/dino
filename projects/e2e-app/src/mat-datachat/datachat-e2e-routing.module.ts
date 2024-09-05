import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DataChatE2E} from './datachat-e2e.component';

const routes: Routes = [
  {
    path: '',
    component: DataChatE2E,
    data: {breadcrumbs: null},
  },
];

@NgModule({imports: [RouterModule.forChild(routes)], exports: [RouterModule]})
export class DataChatRoutingModule {}
