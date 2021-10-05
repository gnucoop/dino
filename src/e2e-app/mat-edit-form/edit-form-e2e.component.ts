import {Component} from '@angular/core';
import {FormDataManager} from '@dewco/core/forms';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form-e2e.component.html',
})
export class MatEditFormE2E {
  readonly manager: FormDataManager;

  constructor(
      private _formDataManager: FormDataManager,
  ) {
    this.manager = this._formDataManager;
  }
}
