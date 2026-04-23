import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {EditPublicFormModule as DinoEditPublicFormModule} from '@dino/material/edit-public-form';

import {EditPublicFormComponent} from './components/edit-public-form.component';
import {EditPublicFormRoutingModule} from './edit-form-public-routing.module';

@NgModule({
  declarations: [EditPublicFormComponent],
  imports: [CommonModule, DinoEditPublicFormModule, EditPublicFormRoutingModule],
})
export class EditPublicFormModule {}
