import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {RouterModule} from '@angular/router';
import {MainModule as DinoMainModule} from '@dewco/material/main-nav';

import {MatMainE2E} from './main-e2e.component';


@NgModule({
  declarations: [
    MatMainE2E,
  ],
  imports: [
    CommonModule,
    DinoMainModule,
    MatListModule,
    RouterModule,
  ],
  exports: [
    MatMainE2E,
  ],
})
export class MaterialMainE2EModule {
}
