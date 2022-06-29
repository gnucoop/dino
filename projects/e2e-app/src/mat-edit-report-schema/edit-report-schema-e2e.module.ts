import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';
import {ReportsModule as DinoReportsModule} from '@dino/core/reports';
import {EditReportSchemaModule as DinoEditReportSchemaModule} from '@dino/material/edit-report-schema';

import {MatEditReportSchemaE2E} from './edit-report-schema-e2e.component';
import {EditReportSchemaRoutingModule} from './edit-report-schema-e2e-routing.module';

@NgModule({
  declarations: [MatEditReportSchemaE2E],
  imports: [
    CommonModule,
    DinoBreadcrumbsModule,
    DinoEditReportSchemaModule,
    DinoReportsModule,
    EditReportSchemaRoutingModule,
  ],
})
export class MaterialEditReportSchemaE2eModule {}
