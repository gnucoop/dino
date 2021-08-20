import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule as DinoFormsModule} from '@dewco/core/forms';
import {CreateFormModule as DinoCreateFormModule} from '@dewco/material/create-form';
import {MatCreateE2E} from './create-e2e.component';

@NgModule({
  declarations: [MatCreateE2E],
  imports: [
    CommonModule,
    DinoCreateFormModule,
    DinoFormsModule,
  ],
})
export class MaterialCreateE2eModule {
}
