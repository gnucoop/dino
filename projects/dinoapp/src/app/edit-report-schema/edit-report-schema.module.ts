import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';
import {ReportsModule as DinoReportsModule} from '@dino/core/reports';
import {EditReportSchemaModule as DinoEditReportSchemaModule} from '@dino/material/edit-report-schema';

import {EditReportSchemaComponent} from './components/edit-report-schema.component';
import {EditReportSchemaRoutingModule} from './edit-report-schema-routing.module';

@NgModule({
  declarations: [EditReportSchemaComponent],
  imports: [
    CommonModule,
    EditReportSchemaRoutingModule,
    DinoBreadcrumbsModule,
    DinoEditReportSchemaModule,
    DinoReportsModule,
    MatDialogModule,
  ],
})
export class EditReportSchemaModule {}
