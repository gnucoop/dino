import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DataChatComponent} from './components/datachat.component';

const routes: Routes = [
  {
    path: '',
    component: DataChatComponent,
    data: {breadcrumbs: null},
  },
];

@NgModule({imports: [RouterModule.forChild(routes)], exports: [RouterModule]})
export class DataChatRoutingModule {}
