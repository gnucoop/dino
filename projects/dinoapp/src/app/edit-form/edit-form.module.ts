import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';
import {FormsModule as DinoFormsModule} from '@dino/core/forms';
import {EditFormModule as DinoEditFormModule} from '@dino/material/edit-form';

import {EditFormComponent} from './components/edit-form.component';
import {EditFormRoutingModule} from './edit-form-routing.module';
import {NameMatchValidator} from '@dino/material/metric-editor';

@NgModule({
  declarations: [EditFormComponent],
  imports: [
    CommonModule,
    EditFormRoutingModule,
    DinoBreadcrumbsModule,
    DinoEditFormModule,
    DinoFormsModule,
  ],
  providers: [
    NameMatchValidator,
  ],
})
export class EditFormModule {}
