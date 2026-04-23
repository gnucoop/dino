import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GptComponent} from './components/gpt.component';

const routes: Routes = [
  {path: '', component: GptComponent, data: {breadcrumbs: null, aggregation: true}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GptRoutingModule {
}
