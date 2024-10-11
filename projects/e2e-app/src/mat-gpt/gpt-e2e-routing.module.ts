import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GptE2E} from './gpt-e2e.component';

const routes: Routes = [
  {
    path: '',
    component: GptE2E,
    data: {breadcrumbs: null},
  },
];

@NgModule({imports: [RouterModule.forChild(routes)], exports: [RouterModule]})
export class GptRoutingModule {}
