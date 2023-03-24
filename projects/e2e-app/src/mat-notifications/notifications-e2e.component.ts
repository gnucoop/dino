import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {Router} from '@angular/router';
import {ActionTrigger} from '@dino/core/data';
import {ActionType, FiltersService, ListAction, ListHeader} from '@dino/core/list';
import {Notification, NotificationManager} from '@dino/core/notifications';
import {UserDataManager} from '@dino/core/users';
import {ListDataSource} from '@dino/material/list';
import {map, Subscription} from 'rxjs';

@Component({
  selector: 'app-notifications',
  templateUrl: 'notifications-e2e.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MatNotificationsE2E implements OnDestroy, OnInit {
  readonly headers: ListHeader<Notification & {read?: boolean}>[] = [
    {column: 'id', label: 'ID', displayed: false},
    {column: 'text', label: 'Text', displayed: true},
    {column: 'created_at', label: 'Creation Date', sortable: false, displayed: true},
  ];

  readonly onClickRowActions: ActionType[] = ['expand'];

  dataSource!: ListDataSource<Notification & {read?: boolean}>;

  readonly listRowActions: ListAction[] = [];

  /**
   * The active User Data Id
   */
  private _userDataId: string | null = null;

  private _userDataSub = Subscription.EMPTY;

  private _ntmSub = Subscription.EMPTY;

  constructor(
    private _notificationManager: NotificationManager,
    private _filtersService: FiltersService,
    private _udm: UserDataManager,
    private _router: Router,
  ) {}

  /**
   * Return true if the notification is yet to be read by the user
   * @param row
   */
  isHighlightedRowMethod = (row: Notification): boolean => {
    if (row.readers.length === 0) {
      return true;
    }
    const read = this._userDataId != null ? row.readers.includes(this._userDataId) : false;
    if (!read) {
      return true;
    }
    return false;
  };

  /**
   * Redirects to an url attached to the notification
   * @param trigger The notification
   */
  markAsReadAndGoToUrl(trigger: ActionTrigger<Notification>) {
    console.log(trigger);
    const doc = trigger.triggerData?.doc;
    if (doc == null || doc.redirect_url == null) {
      return;
    }
    this._ntmSub = this._notificationManager
      .markNotificationAsRead(doc, this._userDataId)
      .subscribe(_ => {
        if (doc == null || doc.redirect_url == null) {
          return;
        }
        this._router.navigateByUrl(doc.redirect_url);
      });
  }

  ngOnInit(): void {
    this.dataSource = new ListDataSource(this._notificationManager, this._filtersService);
    this._userDataSub = this._udm
      .getActiveUserData()
      .pipe(map(userData => userData?.id ?? null))
      .subscribe(userId => (this._userDataId = userId));
  }

  ngOnDestroy(): void {
    this._userDataSub.unsubscribe();
    this._ntmSub.unsubscribe();
  }
}
