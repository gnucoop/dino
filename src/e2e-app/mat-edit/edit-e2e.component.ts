import {Component} from '@angular/core';
import {FormDataManager} from '@dewco/core/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit-e2e.component.html',
})
export class MatEditE2E {
  readonly manager: FormDataManager;

  constructor(
      private _formDataManager: FormDataManager,
  ) {
    this.manager = this._formDataManager;
  }
}
