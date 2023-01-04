import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {MatLegacyListModule as MatListModule} from '@angular/material/legacy-list';
import {RouterModule} from '@angular/router';
import {DataModule as DinoDataModule} from '@dino/core/data';
import {MainNavModule} from '@dino/material/main-nav';

import {MatMainE2E} from './main-e2e.component';

@NgModule({
  declarations: [MatMainE2E],
  imports: [
    CommonModule,
    DinoDataModule,
    MainNavModule,
    MatListModule,
    RouterModule,
    MatButtonModule,
  ],
  exports: [MatMainE2E],
})
export class MaterialMainE2EModule {}
