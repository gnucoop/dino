import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {DataService, PermissionContextService} from '@dino/core/data';
import {delay, distinctUntilChanged, filter, map, switchMap, takeUntil, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {additionalConfig} from '../mockconfig';
import {instanceName} from '../mocks';
import {UserGroupManager} from '@dino/core/users';

@Component({
  selector: 'app-dashboard-report',
  templateUrl: 'dashboard-report-e2e.component.html',
  styleUrls: ['dashboard-report-e2e.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MatDashboardReportE2E {
  @Output() isLoading: Observable<boolean>;
  syncFinished: EventEmitter<void> = new EventEmitter<void>();
  favoriteReportId: string | null;
  readonly optionalMetrics: boolean = additionalConfig.optionalReportMetrics;

  constructor(
    private _pcs: PermissionContextService,
    private _ds: DataService,
    private _ugm: UserGroupManager,
  ) {
    this.favoriteReportId = localStorage.getItem(`dino_favorite_report_${instanceName}`);
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
  }
}
