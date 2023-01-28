import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {ActionTrigger} from '@dino/core/data';
import {ActionType, FiltersService, ListAction, ListHeader} from '@dino/core/list';
import {Notification, NotificationManager} from '@dino/core/notifications';
import {ListDataSource} from '@dino/material/list';

@Component({
  selector: 'app-notifications',
  templateUrl: 'notifications-e2e.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MatNotificationsE2E implements OnInit {
  readonly headers: ListHeader<Notification & {read?: boolean}>[] = [
    {column: 'id', label: 'ID', displayed: false},
    {column: 'text', label: 'Text', displayed: true},
    {column: 'created_at', label: 'Creation Date', sortable: true, displayed: false},
  ];

  readonly onClickRowActions: ActionType[] = ['expand'];

  dataSource!: ListDataSource<Notification & {read?: boolean}>;

  readonly listRowActions: ListAction[] = [];

  constructor(
    private _notificationManager: NotificationManager,
    private _filtersService: FiltersService,
    private _router: Router,
  ) {}

  markAsReadAndGoToUrl(trigger: ActionTrigger<Notification>) {
    console.log(trigger);
    const doc = trigger.triggerData?.doc;
    if (doc == null) {
      return;
    }
    if (doc.redirect_url) {
      this._router.navigateByUrl(doc.redirect_url);
    }
  }
  ngOnInit(): void {
    this.dataSource = new ListDataSource(this._notificationManager, this._filtersService);
  }
}
