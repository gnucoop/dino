import {ChangeDetectionStrategy, Component, Optional, ViewEncapsulation} from '@angular/core';
import {ActionTrigger} from '@dino/core/data';
import {FormDataManager} from '@dino/core/forms';
import {LogManager} from '@dino/core/logs';
import {UserData} from '@dino/core/users';
import {of as obsOf, take} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {ActionsService} from 'src/app/actions.service';
import {environment} from 'src/environments/environment';
import * as conf from '../conf';

@Component({
  selector: 'dinoapp-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class EditFormComponent {
  readonly manager: FormDataManager;
  readonly allowMetricCreationFor: string[] | undefined =
    environment.metricsConfig.allowMetricCreationFor;
  readonly optionalMetrics: boolean = environment.metricsConfig.optionalFormMetrics;
  readonly pipelines?: string[] = environment.formsConfig.pipelines;
  readonly secondaryMetricFieldsDisplayed: {
    [metricName: string]: string | string [];
  } | null = conf.secondaryMetricFieldsDisplayed;
  readonly saveDraft =
    environment.formsConfig.saveDraft === undefined ? false : environment.formsConfig.saveDraft;
  readonly centeredFieldsContent: boolean = environment.layoutConfig.centeredFieldsContent ?? false;
  readonly maxAjfFormColumns: 1 | 2 | 3 = environment.layoutConfig.maxAjfFormColumns ?? 1;
  readonly formInfoMessage: string | undefined = conf.formInfoMessage;

  constructor(
    private _dataManager: FormDataManager,
    private _actionService: ActionsService,
    private _fdm: FormDataManager,
    @Optional() private _logManager: LogManager | null,
  ) {
    this.manager = this._dataManager;
  }

  processActionTrigger<T>(trigger: ActionTrigger<T>) {
    this._actionService.processTrigger(trigger);

    if (this._logManager != null && trigger.triggerType === 'on_form_data_change') {
      const oldDoc = trigger.triggerData?.previousValue;
      const newDoc = trigger.triggerData?.newValue;
      const activeUserData: UserData = trigger.triggerData?.additional_info
        ? trigger.triggerData?.additional_info['activeUser']
        : null;
      const diff = this._fdm.compareFormDatas(oldDoc, newDoc);
      const populatedNewDoc = this._fdm.populateFormData(newDoc);
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
            const changesArray = this._logManager!.generateChangesArray(newForm, diff);
            return this._logManager!.generateLog(
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
