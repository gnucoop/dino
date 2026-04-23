import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RagComponent} from './components/rag.component';

const routes: Routes = [
  {path: '', component: RagComponent, data: {breadcrumbs: null, aggregation: true}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RagRoutingModule {
}
