import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PermissionContextService} from '@dino/core/data';
import {UserGroupManager} from '@dino/core/users';
import {CollectItem} from '@dino/material/collect';
import {UITourService} from '@dino/material/ui-tour-service';
import {combineLatest, Observable} from 'rxjs';
import {filter, map, shareReplay} from 'rxjs/operators';
import {adminItems, adminRoles, collectItems, metricItem} from '../../conf';

@Component({
  selector: 'dinoapp-dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrls: ['./dashboard-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DashboardMenuComponent implements OnInit {
  collectItems: Observable<CollectItem[]>;

  constructor(
    readonly userGroupManager: UserGroupManager,
    private _pcs: PermissionContextService,
    private _tourService: UITourService,
  ) {
    this.collectItems = combineLatest([
      this.userGroupManager.isActiveUserAdmin(adminRoles),
      this._pcs.fullContext.pipe(filter(ctx => ctx != null && ctx.user_permissions != null)),
    ]).pipe(
      filter(([_isAdmin, ctx]) => ctx != null && ctx['user_permissions'] != null),
      map(([isAdmin, context]) => {
        let items = [...collectItems];
        if (isAdmin) {
          items.push(...adminItems);
        }
        if (
          context != null &&
          context.user_permissions != null &&
          !this._pcs.isActiveUserGuestOnly(context.user_permissions ?? {}) &&
          !this._findMenuItem(metricItem, items) &&
          !this._findMenuItem(metricItem, adminItems)
        ) {
          items.push(metricItem);
        }
        return items;
      }),
      shareReplay(1),
    );
  }

  ngOnInit(): void {
    this._tourService.start();
  }

  private _findMenuItem(item: CollectItem, collectItems: CollectItem[]): boolean {
    return collectItems.some(i => i.name === item.name);
  }
}
