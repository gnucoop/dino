import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {ActionTrigger} from '@dino/core/data';
import {FormDataManager} from '@dino/core/forms';
import {ActionsService} from 'src/app/actions.service';
import {environment} from 'src/environments/environment';
import * as conf from '../conf';
@Component({
  selector: 'dinoapp-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CreateFormComponent {
  readonly manager: FormDataManager;
  readonly allowMetricCreationFor: string[] | undefined =
    environment.metricsConfig.allowMetricCreationFor;
  readonly optionalMetrics: boolean = environment.metricsConfig.optionalFormMetrics;
  readonly pipelines?: string[] = environment.formsConfig.pipelines;
  readonly recordAudioEnabled: {[key: string]: boolean} | null =
    environment.formsConfig.recordAudioEnabled || null;
  readonly secondaryMetricFieldsDisplayed: {
    [metricName: string]: string | string [];
  } | null = conf.secondaryMetricFieldsDisplayed;
  readonly saveDraft =
    environment.formsConfig.saveDraft === undefined ? false : environment.formsConfig.saveDraft;
  readonly centeredFieldsContent: boolean = environment.layoutConfig.centeredFieldsContent ?? false;
  readonly maxAjfFormColumns: 1 | 2 | 3 = environment.layoutConfig.maxAjfFormColumns ?? 1;
  readonly formInfoMessage: string | undefined = conf.formInfoMessage;

  constructor(private _dataManager: FormDataManager, private _actionService: ActionsService) {
    this.manager = this._dataManager;
  }

  processActionTrigger<T>(trigger: ActionTrigger<T>) {
    this._actionService.processTrigger(trigger);
  }
}
