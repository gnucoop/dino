import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormsListComponent} from './components/forms-list.component';

const routes: Routes = [
  {path: '', component: FormsListComponent, data: {breadcrumbs: null, isFormData: true}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormsListRoutingModule {
}
