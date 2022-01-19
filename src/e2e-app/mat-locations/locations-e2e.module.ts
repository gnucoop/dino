import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MetricSectionModule} from '@dino/material/metric-section';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';

import {MatLocationsE2E} from './locations-e2e.component';

@NgModule({
  declarations: [MatLocationsE2E],
  imports: [CommonModule, DinoBreadcrumbsModule, MetricSectionModule],
})
export class MaterialLocationsE2eModule {}
