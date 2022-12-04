import {Component} from '@angular/core';
import {FormDataManager} from '@dino/core/forms';
import {additionalConfig} from '../mockconfig';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form-e2e.component.html',
})
export class MatEditFormE2E {
  readonly manager: FormDataManager;
  readonly optionalMetrics: boolean = additionalConfig.optionalFormMetrics;
  readonly offlineFileUpload: boolean = additionalConfig.offlineFileUpload;
  readonly pipelines: string[] = additionalConfig.pipelines;

  constructor(private _formDataManager: FormDataManager) {
    this.manager = this._formDataManager;
  }
}
