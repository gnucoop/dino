import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {ActionTrigger} from '@dino/core/data';
import {ActionsService} from 'src/app/actions.service';

@Component({
  selector: 'dinoapp-edit-public-form',
  templateUrl: './edit-public-form.component.html',
  styleUrls: ['./edit-public-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class EditPublicFormComponent {
  constructor(private _actionService: ActionsService) {}
  processActionTrigger<T>(trigger: ActionTrigger<T>) {
    this._actionService.processTrigger(trigger);
  }
}
