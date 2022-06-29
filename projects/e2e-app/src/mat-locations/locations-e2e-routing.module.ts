import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MatLocationsE2E} from './locations-e2e.component';

const routes: Routes = [
  {
    path: '',
    component: MatLocationsE2E,
    data: {breadcrumbs: null},
  },
];

@NgModule({imports: [RouterModule.forChild(routes)], exports: [RouterModule]})
export class LocationsRoutingModule {}
