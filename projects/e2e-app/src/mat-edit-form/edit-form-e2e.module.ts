import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule as DinoFormsModule} from '@dino/core/forms';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';
import {EditFormModule as DinoEditFormModule} from '@dino/material/edit-form';
import {EditFormRoutingModule} from './edit-form-e2e-routing.module';

import {MatEditFormE2E} from './edit-form-e2e.component';

@NgModule({
  declarations: [MatEditFormE2E],
  imports: [
    CommonModule,
    DinoBreadcrumbsModule,
    DinoEditFormModule,
    DinoFormsModule,
    EditFormRoutingModule,
  ],
})
export class MaterialEditFormE2eModule {}
