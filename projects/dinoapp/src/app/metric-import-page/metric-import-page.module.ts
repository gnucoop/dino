import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';
import {MetricImportModule as DinoMetricImportModule} from '@dino/material/metric-section';

import {MetricImportPageComponent} from './components/metric-import-page.component';
import {MetricImportPageRoutingModule} from './metric-import-page-routing.module';

@NgModule({
  declarations: [MetricImportPageComponent],
  imports: [
    CommonModule,
    DinoBreadcrumbsModule,
    DinoMetricImportModule,
    MetricImportPageRoutingModule,
  ],
})
export class MetricImportPageModule {}
