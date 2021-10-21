import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MetricSectionModule} from '@dewco/material/metric-section';

import {MatLocationsE2E} from './locations-e2e.component';

@NgModule({
  declarations: [MatLocationsE2E],
  imports: [CommonModule, MetricSectionModule],
})
export class MaterialLocationsE2eModule {}
