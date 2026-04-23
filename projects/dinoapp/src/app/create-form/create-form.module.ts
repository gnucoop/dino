import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';
import {FormsModule as DinoFormsModule} from '@dino/core/forms';
import {CreateFormModule as DinoCreateFormModule} from '@dino/material/create-form';

import {CreateFormComponent} from './components/create-form.component';
import {CreateFormRoutingModule} from './create-form-routing.module';
import {NameMatchValidator} from '@dino/material/metric-editor';

@NgModule({
  declarations: [CreateFormComponent],
  imports: [
    CommonModule,
    CreateFormRoutingModule,
    DinoBreadcrumbsModule,
    DinoCreateFormModule,
    DinoFormsModule,
  ],
  providers: [
    NameMatchValidator,
  ],
})
export class CreateFormModule {}
