import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule as DinoFormsModule} from '@dino/core/forms';
import {EditFormSchemaModule as DinoEditFormSchemaModule} from '@dino/material/edit-form-schema';
import {MatEditFormSchemaE2E} from './edit-form-schema-e2e.component';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';

@NgModule({
  declarations: [MatEditFormSchemaE2E],
  imports: [CommonModule, DinoBreadcrumbsModule, DinoEditFormSchemaModule, DinoFormsModule],
})
export class MaterialEditFormSchemaE2eModule {}
