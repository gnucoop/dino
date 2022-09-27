import {Component, EventEmitter, Output} from '@angular/core';
import {NetworkStatusService} from '@dino/core/auth';
import {DataService, PermissionContextService} from '@dino/core/data';
import {UserGroupManager} from '@dino/core/users';
import {BreakpointObserverService} from '@dino/material/breakpoint-observer';
import {CollectItem} from '@dino/material/collect';
import {
  delay,
  distinctUntilChanged,
  filter,
  map,
  shareReplay,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import {combineLatest, Observable, of} from 'rxjs';

@Component({
  selector: 'app-dashboard-menu',
  templateUrl: 'dashboard-menu-e2e.component.html',
})
export class MatDashboardMenuE2E {
  @Output() isLoading: Observable<boolean>;
  syncFinished: EventEmitter<void> = new EventEmitter<void>();
  collectItems: Observable<CollectItem[]>;

  constructor(
    readonly breakpointObserver: BreakpointObserverService,
    readonly networkStatus: NetworkStatusService,
    private _pcs: PermissionContextService,
    private _ds: DataService,
    private _ugm: UserGroupManager,
  ) {
    this.isLoading = this._ugm.isActiveUserAdmin().pipe(
      switchMap(() => {
        return this._ds.isSyncing.pipe(
          switchMap(syncing => {
            if (syncing) {
              return of(true);
            }
            return this._pcs.fullContext.pipe(
              filter(ctx => ctx != null),
              map(ctx => {
                if (ctx == null) {
                  return false;
                }
                return ctx.user_permissions == null && ctx.user != null;
              }),
            );
          }),
          distinctUntilChanged(),
        );
      }),
      takeUntil(this.syncFinished.pipe(delay(100))),
      tap(c => {
        if (!c) {
          this.syncFinished.emit();
        }
      }),
    );

    this.collectItems = combineLatest([
      this._ugm.isActiveUserAdmin(),
      this._pcs.fullContext.pipe(filter(ctx => ctx != null && ctx.user_permissions != null)),
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
        if (
          context != null &&
          context.user_permissions != null &&
          !this._pcs.isActiveUserGuestOnly(context.user_permissions)
        ) {
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
