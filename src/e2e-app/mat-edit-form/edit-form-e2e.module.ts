import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule as DinoFormsModule} from '@dino/core/forms';
import {EditFormModule as DinoEditFormModule} from '@dino/material/edit-form';
import {MatEditFormE2E} from './edit-form-e2e.component';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';

@NgModule({
  declarations: [MatEditFormE2E],
  imports: [CommonModule, DinoBreadcrumbsModule, DinoEditFormModule, DinoFormsModule],
})
export class MaterialEditFormE2eModule {}
