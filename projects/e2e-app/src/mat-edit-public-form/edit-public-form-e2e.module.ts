import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';
import {EditPublicFormRoutingModule} from './edit-public-form-e2e-routing.module';
import {EditPublicFormModule as DinoEditPublicFormModule} from '@dino/material/edit-public-form';

import {MatEditPublicFormE2E} from './edit-public-form-e2e.component';

@NgModule({
  declarations: [MatEditPublicFormE2E],
  imports: [
    CommonModule,
    DinoBreadcrumbsModule,
    DinoEditPublicFormModule,
    EditPublicFormRoutingModule,
  ],
})
export class MaterialEditPublicFormE2eModule {}
