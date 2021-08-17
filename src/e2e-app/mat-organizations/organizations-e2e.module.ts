import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MetricSectionModule} from '@dewco/material/metric-section';

import {MatOrganizationsE2E} from './organizations-e2e.component';

@NgModule({
  declarations: [MatOrganizationsE2E],
  imports: [
    CommonModule,
    MetricSectionModule,
  ],
})
export class MaterialOrganizationsE2eModule {
}
