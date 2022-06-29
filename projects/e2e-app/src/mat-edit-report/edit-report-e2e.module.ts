import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule as DinoFormsModule} from '@dino/core/forms';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';
import {EditReportModule as DinoEditReportModule} from '@dino/material/edit-report';
import {EditReportRoutingModule} from './edit-report-e2e-routing.module';

import {MatEditReportE2E} from './edit-report-e2e.component';

@NgModule({
  declarations: [MatEditReportE2E],
  imports: [
    CommonModule,
    DinoBreadcrumbsModule,
    DinoEditReportModule,
    DinoFormsModule,
    EditReportRoutingModule,
  ],
})
export class MaterialEditReportE2eModule {}
