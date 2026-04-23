import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule as DinoFormsModule} from '@dino/core/forms';
import {EditFormSchemaModule as DinoEditFormSchemaModule} from '@dino/material/edit-form-schema';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';

import {EditFormSchemaComponent} from './components/edit-form-schema.component';
import {EditFormSchemaRoutingModule} from './edit-form-schema-routing.module';

@NgModule({
  declarations: [EditFormSchemaComponent],
  imports: [
    CommonModule,
    EditFormSchemaRoutingModule,
    DinoBreadcrumbsModule,
    DinoEditFormSchemaModule,
    DinoFormsModule,
  ],
})
export class EditFormSchemaModule {}
