import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule as DinoFormsModule} from '@dewco/core/forms';
import {EditReportModule as DinoEditReportModule} from '@dewco/material/edit-report';
import {MatEditReportE2E} from './edit-report-e2e.component';

@NgModule({
  declarations: [MatEditReportE2E],
  imports: [CommonModule, DinoEditReportModule, DinoFormsModule],
})
export class MaterialEditFormE2eModule {}
