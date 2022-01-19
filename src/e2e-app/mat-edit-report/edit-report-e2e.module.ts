import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule as DinoFormsModule} from '@dino/core/forms';
import {EditReportModule as DinoEditReportModule} from '@dino/material/edit-report';
import {MatEditReportE2E} from './edit-report-e2e.component';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';

@NgModule({
  declarations: [MatEditReportE2E],
  imports: [CommonModule, DinoBreadcrumbsModule, DinoEditReportModule, DinoFormsModule],
})
export class MaterialEditReportE2eModule {}
