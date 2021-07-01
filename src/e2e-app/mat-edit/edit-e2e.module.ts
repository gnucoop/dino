import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule as DinoFormsModule} from '@dewco/core/forms';
import {EditFormModule as DinoEditFormModule} from '@dewco/material/edit-form';
import {MatEditE2E} from './edit-e2e.component';

@NgModule({
  declarations: [MatEditE2E],
  imports: [
    CommonModule,
    DinoEditFormModule,
    DinoFormsModule,
  ],
})
export class MaterialEditE2eModule {
}
