import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReportsModule as DinoReportsModule} from '@dino/core/reports';
import {EditReportSchemaModule as DinoEditReportSchemaModule} from '@dino/material/edit-report-schema';
import {MatEditReportSchemaE2E} from './edit-report-schema-e2e.component';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';

@NgModule({
  declarations: [MatEditReportSchemaE2E],
  imports: [CommonModule, DinoBreadcrumbsModule, DinoEditReportSchemaModule, DinoReportsModule],
})
export class MaterialEditReportSchemaE2eModule {}
