import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MatLangsE2e} from './langs-e2e.component';

const routes: Routes = [
  {
    path: '',
    component: MatLangsE2e,
    data: {breadcrumbs: null},
  },
];

@NgModule({imports: [RouterModule.forChild(routes)], exports: [RouterModule]})
export class LangsRoutingModule {}
