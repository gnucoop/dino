import {Component} from '@angular/core';
import {additionalConfig} from '../mockconfig';
import {ActionTrigger} from '@dino/core/data';
import {FormDataManager, FormData} from '@dino/core/forms';

@Component({
  selector: 'app-create-form-data',
  templateUrl: './create-form-data-e2e.component.html',
})
export class MatCreateFormDataE2E {
  readonly manager: FormDataManager;
  readonly optionalMetrics: boolean = additionalConfig.optionalFormMetrics;
  readonly offlineFileUpload: boolean = additionalConfig.offlineFileUpload;
  readonly pipelines: string[] = additionalConfig.pipelines;
  readonly secondaryMetricFieldsDisplayed: {
    [metricName: string]: string | string[];
  } | null = additionalConfig.secondaryMetricFieldsDisplayed;

  constructor(private _formDataManager: FormDataManager) {
    this.manager = this._formDataManager;
  }

  logTrigger(evt: ActionTrigger<FormData>): void {
    console.log(evt);
  }
}
