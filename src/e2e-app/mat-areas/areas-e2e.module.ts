import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MetricSectionModule} from '@dino/material/metric-section';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';

import {MatAreasE2E} from './areas-e2e.component';

@NgModule({
  declarations: [MatAreasE2E],
  imports: [CommonModule, DinoBreadcrumbsModule, MetricSectionModule],
})
export class MaterialAreasE2eModule {}
