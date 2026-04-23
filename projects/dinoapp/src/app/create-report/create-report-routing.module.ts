import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateReportComponent} from './components/create-report.component';

const routes: Routes = [
  {
    path: '',
    component: CreateReportComponent,
    data: {isFormData: true, breadcrumbs: null},
  },
];

@NgModule({imports: [RouterModule.forChild(routes)], exports: [RouterModule]})
export class CreateReportRoutingModule {}
