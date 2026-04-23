import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

import * as conf from '../conf';

@Component({
  selector: 'dinoapp-users',
  templateUrl: 'users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class UsersComponent {
  readonly menuItems = conf.menuItems;
}
