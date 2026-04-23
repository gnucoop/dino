import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';
import {CollectModule as DinoCollectModule} from '@dino/material/collect';

import {MetricsComponent} from './components/metrics.component';
import {MetricsRoutingModule} from './metrics-routing.module';

@NgModule({
  declarations: [MetricsComponent],
  imports: [CommonModule, DinoBreadcrumbsModule, DinoCollectModule, MetricsRoutingModule],
})
export class MetricsModule {}
