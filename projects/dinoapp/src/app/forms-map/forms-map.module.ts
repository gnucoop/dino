import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';

import {FormsMapComponent} from './components/forms-map';
import {TextInputAutocomp} from './components/text-input-autocomp';
import {FormsMapRoutingModule} from './forms-map-routing.module';

@NgModule({
  declarations: [FormsMapComponent, TextInputAutocomp],
  imports: [
    CommonModule,
    FormsMapRoutingModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  providers: [],
})
export class FormsMapModule {}
