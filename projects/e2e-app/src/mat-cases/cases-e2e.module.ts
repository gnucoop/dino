import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';
import {MetricSectionModule} from '@dino/material/metric-section';
import {CasesRoutingModule} from './cases-e2e-routing.module';

import {MatCasesE2E} from './cases-e2e.component';

@NgModule({
  declarations: [MatCasesE2E],
  imports: [CommonModule, DinoBreadcrumbsModule, MetricSectionModule, CasesRoutingModule],
})
export class MaterialCasesE2eModule {}
