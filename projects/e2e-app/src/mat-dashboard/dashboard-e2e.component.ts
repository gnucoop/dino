import {Component} from '@angular/core';
import {NetworkStatusService} from '@dino/core/auth';
import {PermissionContextService} from '@dino/core/data';
import {UserGroupManager} from '@dino/core/users';
import {BreakpointObserverService} from '@dino/material/breakpoint-observer';
import {CollectItem} from '@dino/material/collect';
import {map, shareReplay} from 'rxjs/operators';
import {combineLatest, Observable} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard-e2e.component.html',
})
export class MatDashboardE2E {
  collectItems: Observable<CollectItem[]>;

  constructor(
    readonly breakpointObserver: BreakpointObserverService,
    readonly networkStatus: NetworkStatusService,
    readonly userGroupManager: UserGroupManager,
    private _pcs: PermissionContextService,
  ) {
    this.collectItems = combineLatest([
      this.userGroupManager.isActiveUserAdmin(),
      this._pcs.permissionContext,
    ]).pipe(
      map(([isAdmin, context]) => {
        let items = [
          {
            name: 'forms',
            label: 'Forms',
            icon: 'list_alt',
            url: '/forms',
          },
          {
            name: 'reports',
            label: 'Reports',
            icon: 'stacked_bar_chart',
            url: '/reports',
          },
        ];
        if (isAdmin) {
          items.push({
            name: 'users',
            label: 'Users',
            icon: 'people',
            url: '/users',
          });
        }
        if (context != null && !this._pcs.isActiveUserGuestOnly(context['user_permissions'])) {
          items.push({
            name: 'metrics',
            label: 'Metrics',
            icon: 'bookmarks',
            url: '/metrics',
          });
        }
        return items;
      }),
      shareReplay(1),
    );
  }
}
