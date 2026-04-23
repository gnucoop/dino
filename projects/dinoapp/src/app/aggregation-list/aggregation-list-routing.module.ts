import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AggregationListComponent} from './components/aggregation-list.component';

const routes: Routes = [
  {path: '', component: AggregationListComponent, data: {breadcrumbs: null, aggregation: true}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AggregationListRoutingModule {
}
