import {Component} from '@angular/core';
import {NetworkStatusService} from '@dino/core/auth';
import {BreakpointObserverService} from '@dino/material/breakpoint-observer';

@Component({
  selector: 'app-users',
  templateUrl: 'users-e2e.component.html',
})
export class MatUsersE2E {
  readonly menuItems = [
    {
      name: 'manage',
      label: 'Users',
      icon: 'groups',
      url: 'list',
    },
    // {
    //   name: 'roles',
    //   label: 'Roles',
    //   icon: 'school',
    //   url: 'roles',
    // },
    {
      name: 'groups',
      label: 'Groups',
      icon: 'badge',
      url: 'groups',
    },
  ];

  constructor(
    readonly breakpointObserver: BreakpointObserverService,
    readonly networkStatus: NetworkStatusService,
  ) {}
}
