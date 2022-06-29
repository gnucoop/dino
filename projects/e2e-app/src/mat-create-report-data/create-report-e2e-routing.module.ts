import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MatCreateReportDataE2E} from './create-report-data-e2e.component';

const routes: Routes = [
  {
    path: '',
    component: MatCreateReportDataE2E,
    data: {isFormData: true, breadcrumbs: null},
  },
];

@NgModule({imports: [RouterModule.forChild(routes)], exports: [RouterModule]})
export class CreateReportRoutingModule {}
