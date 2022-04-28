import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';
import {MetricSectionModule} from '@dino/material/metric-section';

import {MatCasesE2E} from './cases-e2e.component';

@NgModule({
  declarations: [MatCasesE2E],
  imports: [CommonModule, DinoBreadcrumbsModule, MetricSectionModule],
})
export class MaterialCasesE2eModule {}
