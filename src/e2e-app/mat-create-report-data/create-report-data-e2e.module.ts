import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReportsModule as DinoReportsModule} from '@dino/core/reports';
import {CreateReportModule as DinoCreateReportModule} from '@dino/material/create-report';
import {MatCreateReportDataE2E} from './create-report-data-e2e.component';

@NgModule({
  declarations: [MatCreateReportDataE2E],
  imports: [CommonModule, DinoCreateReportModule, DinoReportsModule],
})
export class MaterialCreateReportDataE2eModule {}
