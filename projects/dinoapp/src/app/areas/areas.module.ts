import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';
import {MetricSectionModule} from '@dino/material/metric-section';
import {AreasRoutingModule} from './areas-routing.module';
import {AreasComponent} from './components/areas.component';

@NgModule({
  declarations: [AreasComponent],
  imports: [
    AreasRoutingModule,
    CommonModule,
    DinoBreadcrumbsModule,
    MetricSectionModule,
  ],
})
export class AreasModule {
}
