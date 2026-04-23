import {Component, Inject} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';

@Component({
  selector: 'dinoapp-install-app',
  templateUrl: './install-app.component.html',
  styleUrls: ['./install-app.component.scss']
})
export class InstallAppComponent {
  constructor(
      @Inject(MAT_BOTTOM_SHEET_DATA) public data:
          {mobileType: 'ios'|'android'|'browser', promptEvent?: any},
      private bottomSheetRef: MatBottomSheetRef<InstallAppComponent>) {}

  public installPwa(): void {
    this.data.promptEvent.prompt();
    this.close();
  }

  public close() {
    this.bottomSheetRef.dismiss();
  }
}
