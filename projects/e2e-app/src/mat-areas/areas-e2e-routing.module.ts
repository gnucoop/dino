import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MatAreasE2E} from './areas-e2e.component';

const routes: Routes = [
  {
    path: '',
    component: MatAreasE2E,
    data: {breadcrumbs: null},
  },
];

@NgModule({imports: [RouterModule.forChild(routes)], exports: [RouterModule]})
export class AreasRoutingModule {}
