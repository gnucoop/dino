import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MatAggregationListE2E} from './aggregation-list-e2e';

const routes: Routes = [
  {path: '', component: MatAggregationListE2E, data: {breadcrumbs: null, aggregation: true}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AggregationListRoutingModule {}
