import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule as DinoFormsModule} from '@dino/core/forms';
import {CreateFormModule as DinoCreateFormModule} from '@dino/material/create-form';
import {MatCreateFormDataE2E} from './create-form-data-e2e.component';

@NgModule({
  declarations: [MatCreateFormDataE2E],
  imports: [CommonModule, DinoCreateFormModule, DinoFormsModule],
})
export class MaterialCreateFormDataE2eModule {}
