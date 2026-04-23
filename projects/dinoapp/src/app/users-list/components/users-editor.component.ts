import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {ActionTrigger} from '@dino/core/data';
import {UserData} from '@dino/core/users';
import {ActionsService} from 'src/app/actions.service';

@Component({
  selector: 'dinoapp-users-editor',
  templateUrl: './users-editor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class UsersEditor {
  constructor(private _actionService: ActionsService) {}

  processTrigger(trigger: ActionTrigger<UserData>): void {
    this._actionService.processTrigger(trigger);
  }
}
