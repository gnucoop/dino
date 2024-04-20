import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BreakpointObserverService} from '@dino/material/breakpoint-observer';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';

import {MockBreakpointObserver} from '../mocks';
import {MatFormsMapE2E} from './forms-map-e2e';
import {FormsMapRoutingModule} from './forms-map-e2e-routing.module';

@NgModule({
  declarations: [MatFormsMapE2E],
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
  ],
  providers: [{provide: BreakpointObserverService, useClass: MockBreakpointObserver}],
})
export class MaterialFormsMapE2eModule {}
