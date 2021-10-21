import {Component} from '@angular/core';
import {FormDataManager} from '@dino/core/forms';

@Component({
  selector: 'app-edit-report',
  templateUrl: './edit-report-e2e.component.html',
})
export class MatEditReportE2E {
  readonly manager: FormDataManager;

  constructor(private _formDataManager: FormDataManager) {
    this.manager = this._formDataManager;
  }
}
