import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LocationsComponent} from './components/locations.component';

const routes: Routes = [
  {
    path: '',
    component: LocationsComponent,
    data: {breadcrumbs: null},
  },
];

@NgModule({imports: [RouterModule.forChild(routes)], exports: [RouterModule]})
export class LocationsRoutingModule {
}
