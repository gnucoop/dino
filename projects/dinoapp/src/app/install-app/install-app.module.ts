import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {TranslocoModule} from '@ngneat/transloco';

import {InstallAppComponent} from './components/install-app.component';

@NgModule({
  declarations: [InstallAppComponent],
  exports: [InstallAppComponent],
  imports: [
    CommonModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    TranslocoModule,
  ],
})
export class InstallAppModule {}
