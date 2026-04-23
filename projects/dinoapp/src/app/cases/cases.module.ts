import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';
import {MetricSectionModule} from '@dino/material/metric-section';
import {CasesRoutingModule} from './cases-routing.module';
import {CasesComponent} from './components/cases.component';

@NgModule({
  declarations: [CasesComponent],
  imports: [
    CasesRoutingModule,
    CommonModule,
    DinoBreadcrumbsModule,
    MetricSectionModule,
  ],
})
export class CasesModule {
}
