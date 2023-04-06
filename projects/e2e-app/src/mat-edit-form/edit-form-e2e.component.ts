import {Component, Optional} from '@angular/core';
import {ActionTrigger} from '@dino/core/data';
import {FormData, FormDataManager} from '@dino/core/forms';
import {LogManager} from '@dino/core/logs';
import {UserData} from '@dino/core/users';
import {of as obsOf} from 'rxjs';
import {switchMap, take} from 'rxjs/operators';
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

  constructor(private _fdm: FormDataManager, @Optional() private _logManager: LogManager) {
    this.manager = this._fdm;
  }

  processActionTrigger(trigger: ActionTrigger<FormData>) {
    if (this._logManager != null && trigger.triggerType === 'on_form_data_change') {
      const oldDoc = trigger.triggerData?.previousValue;
      const newDoc = trigger.triggerData?.newValue;
      const activeUserData: UserData = trigger.triggerData?.additional_info
        ? trigger.triggerData?.additional_info['activeUser']
        : null;
      const diff = this._fdm.compareFormDatas(oldDoc, newDoc);
      const populatedNewDoc: FormData = this._fdm.populateFormData(newDoc);
      this._fdm
        .generatePopulatedFormObservable(populatedNewDoc)
        .pipe(
          switchMap(newForm => {
            if (
              newForm == null ||
              activeUserData == null ||
              (!diff.attributes.length && !diff.dataAttributes.length)
            ) {
              return obsOf(null);
            }
            const changesArray = this._logManager.generateChangesArray(newForm, diff);
            return this._logManager.generateLog(
              changesArray,
              newForm.id,
              newForm.form_schema_ref_id,
              activeUserData.full_name,
            );
          }),
          take(1),
        )
        .subscribe();
    }
  }
}
