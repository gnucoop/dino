import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';
import {MetricSectionModule} from '@dino/material/metric-section';
import {AreasRoutingModule} from './areas-e2e-routing.module';

import {MatAreasE2E} from './areas-e2e.component';

@NgModule({
  declarations: [MatAreasE2E],
  imports: [CommonModule, DinoBreadcrumbsModule, MetricSectionModule, AreasRoutingModule],
})
export class MaterialAreasE2eModule {}
