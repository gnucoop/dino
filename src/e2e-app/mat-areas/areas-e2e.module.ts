import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MetricSectionModule} from '@dewco/material/metric-section';

import {MatAreasE2E} from './areas-e2e.component';

@NgModule({
  declarations: [MatAreasE2E],
  imports: [
    CommonModule,
    MetricSectionModule,
  ],
})
export class MaterialAreasE2eModule {
}
