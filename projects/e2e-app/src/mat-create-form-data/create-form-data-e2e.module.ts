import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';
import {FormsModule as DinoFormsModule} from '@dino/core/forms';
import {CreateFormModule as DinoCreateFormModule} from '@dino/material/create-form';

import {MatCreateFormDataE2E} from './create-form-data-e2e.component';
import {CreateFormRoutingModule} from './create-form-data-e2e-routing.module';

@NgModule({
  declarations: [MatCreateFormDataE2E],
  imports: [
    CommonModule,
    DinoBreadcrumbsModule,
    DinoCreateFormModule,
    DinoFormsModule,
    CreateFormRoutingModule,
  ],
})
export class MaterialCreateFormDataE2eModule {}
