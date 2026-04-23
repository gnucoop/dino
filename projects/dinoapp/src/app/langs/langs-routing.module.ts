import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LangsComponent} from './components/langs.component';

const routes: Routes = [
  {
    path: '',
    component: LangsComponent,
    data: {breadcrumbs: null},
  },
];

@NgModule({imports: [RouterModule.forChild(routes)], exports: [RouterModule]})
export class LangsRoutingModule {
}
