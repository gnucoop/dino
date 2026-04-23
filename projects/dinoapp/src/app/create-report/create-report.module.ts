import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';
import {ReportsModule as DinoReportsModule} from '@dino/core/reports';
import {CreateReportModule as DinoCreateReportModule} from '@dino/material/create-report';

import {CreateReportComponent} from './components/create-report.component';
import {CreateReportRoutingModule} from './create-report-routing.module';
import {NameMatchValidator} from '@dino/material/metric-editor';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [CreateReportComponent],
  imports: [
    CommonModule,
    CreateReportRoutingModule,
    DinoBreadcrumbsModule,
    DinoCreateReportModule,
    DinoReportsModule,
    MatDialogModule,
  ],
  providers: [
    NameMatchValidator,
  ],
})
export class CreateReportModule {}
