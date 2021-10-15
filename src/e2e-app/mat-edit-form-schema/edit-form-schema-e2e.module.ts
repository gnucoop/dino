import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule as DinoFormsModule} from '@dewco/core/forms';
import {EditFormSchemaModule as DinoEditFormSchemaModule} from '@dewco/material/edit-form-schema';
import {MatEditFormSchemaE2E} from './edit-form-schema-e2e.component';

@NgModule({
  declarations: [MatEditFormSchemaE2E],
  imports: [
    CommonModule,
    DinoEditFormSchemaModule,
    DinoFormsModule,
  ],
})
export class MaterialEditFormSchemaE2eModule {
}
