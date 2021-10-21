import {Component} from '@angular/core';
import {FormDataManager} from '@dewco/core/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create-e2e.component.html',
})
export class MatCreateE2E {
  readonly manager: FormDataManager;

  constructor(private _formDataManager: FormDataManager) {
    this.manager = this._formDataManager;
  }
}
