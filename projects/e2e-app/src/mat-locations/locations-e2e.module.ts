import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';
import {MetricSectionModule} from '@dino/material/metric-section';
import {LocationsRoutingModule} from './locations-e2e-routing.module';

import {MatLocationsE2E} from './locations-e2e.component';

@NgModule({
  declarations: [MatLocationsE2E],
  imports: [CommonModule, DinoBreadcrumbsModule, MetricSectionModule, LocationsRoutingModule],
})
export class MaterialLocationsE2eModule {}
