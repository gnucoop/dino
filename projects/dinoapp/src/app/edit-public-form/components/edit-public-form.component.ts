import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {ActionTrigger} from '@dino/core/data';
import {ActionsService} from 'src/app/actions.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'dinoapp-edit-public-form',
  templateUrl: './edit-public-form.component.html',
  styleUrls: ['./edit-public-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class EditPublicFormComponent {
  /**
   * Platform logo for the "Powered by" survey footer (dark-colored variant,
   * visible on the light survey surface).
   */
  readonly logoUrl: string =
    environment.customImagesConfig?.logoLight ?? 'assets/icons/logos/dino-bar-logo-light.svg';

  constructor(private _actionService: ActionsService) {}
  processActionTrigger<T>(trigger: ActionTrigger<T>) {
    this._actionService.processTrigger(trigger);
  }
}
