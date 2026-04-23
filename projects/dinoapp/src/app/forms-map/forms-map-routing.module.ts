import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormsMapComponent} from './components/forms-map';

const routes: Routes = [
  {path: '', component: FormsMapComponent, data: {breadcrumbs: null, isFormData: true}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormsMapRoutingModule {}
