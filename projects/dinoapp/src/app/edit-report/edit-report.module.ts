import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';
import {FormsModule as DinoFormsModule} from '@dino/core/forms';
import {ReportsModule as DinoReportsModule} from '@dino/core/reports';
import {EditReportModule as DinoEditReportModule} from '@dino/material/edit-report';

import {EditReportComponent} from './components/edit-report.component';
import {EditReportRoutingModule} from './edit-report-routing.module';
import {NameMatchValidator} from '@dino/material/metric-editor';

@NgModule({
  declarations: [EditReportComponent],
  imports: [
    CommonModule,
    DinoBreadcrumbsModule,
    DinoFormsModule,
    EditReportRoutingModule,
    DinoEditReportModule,
    DinoReportsModule,
  ],
  providers: [NameMatchValidator],
})
export class EditReportModule {}
