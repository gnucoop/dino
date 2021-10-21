import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule as DinoFormsModule} from '@dino/core/forms';
import {CreateFormModule as DinoCreateFormModule} from '@dino/material/create-form';
import {MatCreateE2E} from './create-e2e.component';

@NgModule({
  declarations: [MatCreateE2E],
  imports: [CommonModule, DinoCreateFormModule, DinoFormsModule],
})
export class MaterialCreateE2eModule {}
