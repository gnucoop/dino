import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';
import {MetricSectionModule} from '@dino/material/metric-section';

import {LocationsComponent} from './components/locations.component';
import {LocationsRoutingModule} from './locations-routing.module';

@NgModule({
  declarations: [LocationsComponent],
  imports: [
    CommonModule,
    DinoBreadcrumbsModule,
    LocationsRoutingModule,
    MetricSectionModule,
  ],
})
export class LocationsModule {
}
