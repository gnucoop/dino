import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule as DinoFormsModule} from '@dewco/core/forms';
import {EditFormModule as DinoEditFormModule} from '@dewco/material/edit-form';
import {MatEditFormE2E} from './edit-form-e2e.component';

@NgModule({
  declarations: [MatEditFormE2E],
  imports: [CommonModule, DinoEditFormModule, DinoFormsModule],
})
export class MaterialEditFormE2eModule {}
