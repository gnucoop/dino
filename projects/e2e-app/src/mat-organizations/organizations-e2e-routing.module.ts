import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MatOrganizationsE2E} from './organizations-e2e.component';

const routes: Routes = [
  {
    path: '',
    component: MatOrganizationsE2E,
    data: {breadcrumbs: null},
  },
];

@NgModule({imports: [RouterModule.forChild(routes)], exports: [RouterModule]})
export class OrganizationsRoutingModule {}
