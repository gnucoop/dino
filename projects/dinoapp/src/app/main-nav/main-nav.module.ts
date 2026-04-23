import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {RouterModule} from '@angular/router';
import {MainNavModule as DinoMainModule} from '@dino/material/main-nav';
import {DataModule as DinoDataModule} from '@dino/core/data';

import {MainNavComponent} from './components/main-nav.component';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [MainNavComponent],
  imports: [
    CommonModule,
    DinoDataModule,
    DinoMainModule,
    MatListModule,
    MatTooltipModule,
    RouterModule,
  ],
  exports: [MainNavComponent],
})
export class MainNavModule {}
