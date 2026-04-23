import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrganizationsComponent} from './components/organizations.component';

const routes: Routes = [
  {
    path: '',
    component: OrganizationsComponent,
    data: {breadcrumbs: null},
  },
];

@NgModule({imports: [RouterModule.forChild(routes)], exports: [RouterModule]})
export class OrganizationsRoutingModule {
}
