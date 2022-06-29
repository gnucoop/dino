import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MatCasesE2E} from './cases-e2e.component';

const routes: Routes = [
  {
    path: '',
    component: MatCasesE2E,
    data: {breadcrumbs: null},
  },
];

@NgModule({imports: [RouterModule.forChild(routes)], exports: [RouterModule]})
export class CasesRoutingModule {}
