import {Component} from '@angular/core';
import {FormDataManager} from '@dino/core/forms';

@Component({
  selector: 'app-create-form-data',
  templateUrl: './create-form-data-e2e.component.html',
})
export class MatCreateFormDataE2E {
  readonly manager: FormDataManager;

  constructor(private _formDataManager: FormDataManager) {
    this.manager = this._formDataManager;
  }
}
