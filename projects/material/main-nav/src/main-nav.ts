/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Dino (dino).
 *
 * Dino (dino) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Dino (dino) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Dino (dino).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MatSidenav} from '@angular/material/sidenav';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {AuthService, NetworkStatusService} from '@dino/core/auth';
import {DataService, InsertModel, MetricsService, PermissionContextService} from '@dino/core/data';
import {Notification, NotificationManager} from '@dino/core/notifications';
import {UserDataManager, UserGroupManager} from '@dino/core/users';
import {BreakpointObserverService} from '@dino/material/breakpoint-observer';
import {ThemeService} from '@dino/material/core';
import {UserArea} from '@dino/material/user-area';
import {TranslocoService} from '@ngneat/transloco';
import {RxError, RxTypeError} from 'rxdb';
import {
  BehaviorSubject,
  combineLatest,
  forkJoin,
  interval,
  merge,
  Observable,
  of as obsOf,
  Subscription,
  timer,
} from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  mapTo,
  shareReplay,
  startWith,
  switchMap,
  take,
  tap,
  throttleTime,
  withLatestFrom,
} from 'rxjs/operators';

import {Section} from './section-interface';
import {TokensService} from '@dino/material/stripe-payment';
import {UserAreaPanelType} from '@dino/material/user-area';
import {UITourService} from '@dino/material/ui-tour-service';

/**
 * Dino Main component, containing the toolbar and the sidebar navigation.
 */
@Component({
  selector: 'dino-main-nav',
  templateUrl: 'main-nav.html',
  styleUrls: ['main-nav.scss'],
  animations: [
    trigger('loadComponent', [
      state(
        'ready',
        style({
          opacity: 1,
        }),
      ),
      state(
        'loading',
        style({
          opacity: 0,
        }),
      ),
      transition('ready => loading', [animate('0.3s')]),
      transition('loading => ready', [animate('2s')]),
      transition(':enter', [style({opacity: 0}), animate('2000ms', style({opacity: 1}))]),
      transition(':leave', [animate('300ms', style({opacity: 0}))]),
    ]),
    trigger('notificationRing', [
      transition('a <=> b', [
        animate(
          '4s',
          keyframes([
            style({transform: 'rotate(0)', offset: 0}),
            style({transform: 'rotate(20deg)', offset: 0.01}),
            style({transform: 'rotate(-19deg)', offset: 0.03}),
            style({transform: 'rotate(18deg)', offset: 0.05}),
            style({transform: 'rotate(-17deg)', offset: 0.07}),
            style({transform: 'rotate(16deg)', offset: 0.09}),
            style({transform: 'rotate(-15deg)', offset: 0.11}),
            style({transform: 'rotate(14deg)', offset: 0.13}),
            style({transform: 'rotate(-13deg)', offset: 0.15}),
            style({transform: 'rotate(12deg)', offset: 0.17}),
            style({transform: 'rotate(-11deg)', offset: 0.19}),
            style({transform: 'rotate(10deg)', offset: 0.21}),
            style({transform: 'rotate(-9deg)', offset: 0.23}),
            style({transform: 'rotate(8deg)', offset: 0.25}),
            style({transform: 'rotate(-7deg)', offset: 0.27}),
            style({transform: 'rotate(6deg)', offset: 0.29}),
            style({transform: 'rotate(-5deg)', offset: 0.31}),
            style({transform: 'rotate(4deg)', offset: 0.33}),
            style({transform: 'rotate(-3deg)', offset: 0.35}),
            style({transform: 'rotate(2deg)', offset: 0.37}),
            style({transform: 'rotate(-1deg)', offset: 0.39}),
            style({transform: 'rotate(1deg)', offset: 0.41}),
            style({transform: 'rotate(0deg)', offset: 0.43}),
            style({transform: 'rotate(0deg)', offset: 1}),
          ]),
        ),
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MainNav implements AfterViewInit, OnDestroy {
  @HostBinding('class.mat-typography') readonly matTypographyClass = true;
  @ViewChild('sidenav') sidenav!: MatSidenav;

  /**
   * Sets the loading state, and shows the Loading animation.
   * Gets triggered by the output 'isLoading' event of the component rendered in the
   * router outlet.
   * @param elementRef A reference to the rendered component
   */
  onRouterOutletLoading(elementRef: any) {
    this._onRouterOutletLoadingSub.unsubscribe();
    if (elementRef.isLoading) {
      this._onRouterOutletLoadingSub = elementRef.isLoading.subscribe({
        next: (res: boolean) => {
          this.isLoading.next(res);
        },
      });
    }
  }

  /**
   * When toggled, the notification bell animation is triggered
   */
  notificationRingState: boolean = false;

  /**
   * The last stored number of unread notifications
   */
  lastUnreadNotifications: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  /**
   * If not null, there's a new version of Dinoapp ready to be installed.
   * A special icon will be displayed in the main nav bar to let the user know.
   */
  newVersionReady: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  /**
   * If true, the app is backendless
   */
  isBackendless?: boolean;

  /**
   * The Amount of Pandino Tokens available to the user.
   * Displayed only if a valid API Key is found in localstorage.
   */
  availableTokens: Observable<number | null>;
  tokensCounterActive: BehaviorSubject<'add' | 'remove' | null> = new BehaviorSubject<
    'add' | 'remove' | null
  >(null);

  /**
   * The Custom loading spinner image path
   */
  @Input() spinnerImagePath: string | undefined;

  /**
   * If true, Backup/Restore is available to the Admin in the User Area
   */
  @Input() backupRestore: boolean | undefined;

  /**
   * The Custom User Section icon svg name
   */
  @Input() userSectionIcon: string | undefined;

  /**
   * The Custom Sync icon svg name
   */
  @Input() syncIcon: string | undefined;

  /**
   * Determines the initial expanded state of the sidenav
   */
  @Input() set initialExtendedSidenav(state: boolean) {
    if (state == null) {
      return;
    }
    this.extendedSidenav.next(state);
  }
  /**
   * Determines the amount of time after which the Initialization screen
   * should disappear, even if the data synchronization is not fully complete.
   */
  @Input() initializationScreenMaxDuration?: number;

  /**
   * Custom languages to be shown in the Language Selector
   */
  @Input() customLanguages: string[] | undefined;

  /**
   * If true, the logout button is not displayed.
   */
  readonly logoutDisabled: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  @Input()
  set setLogoutDisabled(state: boolean) {
    if (state == null) {
      return;
    }
    this.logoutDisabled.next(state);
  }

  /**
   * If true, the sync spinner is not displayed.
   */
  readonly syncSpinnerDisabled: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  @Input()
  set setSyncSpinnerDisabled(state: boolean) {
    if (state == null) {
      return;
    }
    this.syncSpinnerDisabled.next(state);
  }

  /**
   * If true, the menu button and the side menu are not displayed.
   */
  readonly sideMenuDisabled: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  @Input()
  set setSideMenuDisabled(state: boolean) {
    if (state == null) {
      return;
    }
    this.sideMenuDisabled.next(state);
  }

  /**
   * If true, the logout button temporarily off.
   */
  readonly logoutOff: Observable<boolean>;

  /**
   * Additional action icons that can redirect to the specified urls
   */
  readonly linkIcons: BehaviorSubject<{icon: string; url?: string; tooltip?: string}[]> =
    new BehaviorSubject<{icon: string; url?: string}[]>([]);
  @Input()
  set setLinkIcons(icons: {icon: string; url?: string; tooltip?: string}[]) {
    if (icons == null) {
      return;
    }
    this.linkIcons.next(icons);
  }

  /**
   * The loading state of the component rendered in the router outlet
   */
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * If true, rxDb is currently syncing data with the backend.
   */
  isSyncing: Observable<boolean> = this.dataService.isSyncing;

  /**
   * True when the Syncing process has encountered a problem even after
   * all the resyncAttempts
   */
  problemSyncing: Observable<boolean> = this.dataService.problemSyncing
    .asObservable()
    .pipe(map(collections => collections.length > 0));

  /**
   * Determines the extended state of the sidenav on large screens
   */
  extendedSidenav: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * True if the active user is an Admin
   */
  isAdmin: Observable<boolean>;

  /**
   * Sets the roles that can grant permission to access the Admin sections
   */
  @Input()
  set setAdminRoles(roles: string[]) {
    if (roles != null) {
      this._adminRoles.next(roles);
    }
  }

  /**
   * The Active user full name, displayed in the top nav bar.
   */
  userDisplayName: Observable<string | null>;

  /**
   * The last n notifications received by the active user
   */
  lastNotifications: Observable<(Notification & {read: boolean})[]>;

  /**
   * The unread notifications
   */
  unreadNotificationsNumber: Observable<number>;

  /**
   * When true, the "Unsynced data" badge is displayed on the sync icon
   */
  isThereUnsyncedData: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  /**
   * Subscribes to any collection change event and sync event, to determine if there
   * is any unsynced data and show/hide the "unsynced" badge on the sync icon.
   */
  private _isThereUnsyncedDataSub: Subscription = Subscription.EMPTY;

  /**
   * Subscribes to the Available Tokens
   */
  private _availableTokensSub: Subscription = Subscription.EMPTY;

  /**
   * Subscribes to an interval to check if a 'dino_new_version_ready' entry is in the localStorage.
   */
  private _newVersionCheckSub: Subscription = Subscription.EMPTY;

  /**
   * The current Section
   */
  readonly currentSection: BehaviorSubject<Section | null> = new BehaviorSubject<Section | null>(
    null,
  );

  /**
   * If true, the navigation bar and sidenav are displayed.
   * Should be false in the login page.
   */
  readonly showNav: Observable<boolean>;

  /**
   * A list of all public sections in the Dino app.
   */
  readonly sections$: BehaviorSubject<Section[]> = new BehaviorSubject<Section[]>([]);

  /**
   * The roles granting Admin permissions. 'admin' is the default.
   */
  private _adminRoles: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(['admin']);
  /**
   * Event emitted when the sidenav menu is toggled
   */
  private _menuToggleEvt: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Event emitted when a sidenav menu section is clicked
   */
  private _menuClickEvt: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Subscribes to the the menu toggle event and performs the appropriate
   * action on the sidenav.
   */
  private _menuToggleSub: Subscription = Subscription.EMPTY;

  /**
   * Subscribes to the the menu click event and performs the appropriate
   * action on the sidenav.
   */
  private _menuClickSub: Subscription = Subscription.EMPTY;

  /**
   * Subscribes to the the menu click event and performs the appropriate
   * action on the sidenav.
   */
  private _currentSectionSub: Subscription = Subscription.EMPTY;

  /**
   * Subscribes to the loading state of the component loaded by the router outlet.
   */
  private _onRouterOutletLoadingSub: Subscription = Subscription.EMPTY;

  /**
   * Subscribes to the dataservice syncing until the first sync is completed
   */
  private _syncLoadingSub: Subscription = Subscription.EMPTY;

  /**
   * Subscribes to the DataService 'replicationCycleComplete' event
   */
  private _replicationCycleCompleteSub: Subscription = Subscription.EMPTY;

  /**
   * Subscribes to the DataService 'syncErrorEvt' event
   */
  private _retrySyncSub: Subscription = Subscription.EMPTY;

  /**
   * Subscribes to the DataService 'couldNotSyncEvt' event
   */
  private _couldNotSyncSub: Subscription = Subscription.EMPTY;
  private readonly _maxSyncErrorNotificationLength: number = 500;

  /**
   * If true, the RunSync has run a second time.
   * Used only for live=false instances
   */
  private _hasSyncRerun: boolean = false;

  @Input()
  set sections(sec: Section[]) {
    if (sec == null) {
      return;
    }
    this.sections$.next(sec);
  }

  /**
   * A list of all Admin only sections in the Dino app.
   */
  readonly adminSections$: BehaviorSubject<Section[]> = new BehaviorSubject<Section[]>([]);

  @Input()
  set adminSections(sec: Section[]) {
    if (sec == null) {
      return;
    }
    this.adminSections$.next(sec);
  }

  /**
   * A flag to show or hide section labels in the sidenav.
   */
  private _showNavLabels: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  get showNavLabels(): BehaviorSubject<boolean> {
    return this._showNavLabels;
  }
  @Input()
  set setShowNavLabels(opened: boolean) {
    this._showNavLabels.next(opened);
  }

  /**
   * The Toolbar logo image path/url.
   */
  private _logoImagePath: string = '';
  get logoImagePath(): string {
    return this._logoImagePath;
  }
  @Input()
  set logoImagePath(url: string) {
    this._logoImagePath = url;
  }

  constructor(
    readonly networkStatusService: NetworkStatusService,
    readonly breakpointObserver: BreakpointObserverService,
    readonly metricsService: MetricsService,
    readonly authService: AuthService,
    readonly dataService: DataService,
    readonly userGroupManager: UserGroupManager,
    readonly userDataManager: UserDataManager,
    readonly notificationManager: NotificationManager,
    readonly snackbar: MatSnackBar,
    readonly pcs: PermissionContextService,
    public dialog: MatDialog,
    private _router: Router,
    private _cdr: ChangeDetectorRef,
    private _tokensService: TokensService,
    readonly ts: ThemeService,
    readonly trs: TranslocoService,
    readonly tourService: UITourService,
  ) {
    this.newVersionReady.next(localStorage.getItem('dino_new_version_ready'));
    this.isBackendless = this.dataService.config.syncOptions.backendless;
    this._newVersionCheckSub = interval(1000 * 60 * 10).subscribe(() => {
      this.newVersionReady.next(localStorage.getItem('dino_new_version_ready'));
      this._cdr.detectChanges();
    });

    this._isThereUnsyncedDataSub = this.dataService.collectionChanged
      .pipe(filter(cc => cc.action !== 'replication cycle complete'))
      .subscribe(() => this.isThereUnsyncedData.next(true));

    this._currentSectionSub = combineLatest([
      this._router.events.pipe(
        filter(evt => evt instanceof NavigationEnd || evt instanceof NavigationStart),
      ),
      this.sections$,
      this.adminSections$,
    ]).subscribe(([evt, sections, adminSections]) => {
      const navEvt = evt as NavigationEnd | NavigationStart;
      const allSections = [...sections, ...adminSections];
      const selSection: Section | undefined = allSections.find(section =>
        navEvt.url.includes(section.url),
      );
      this.currentSection.next(selSection ?? null);
    });

    this._replicationCycleCompleteSub = this.dataService.replicationCycleComplete
      .pipe(withLatestFrom(this.dataService.problemSyncing), throttleTime(2000))
      .subscribe(([_, collectionsWithProblems]) => {
        this.isThereUnsyncedData.next(false);
        if (this._hasSyncRerun || this.dataService.config.syncOptions.live) {
          this._hasSyncRerun = false;
          const formattedCollectionsWithProblems = collectionsWithProblems
            .map(coll => coll.replace('_', ' '))
            .join(', ');

          const snackbarMessage = collectionsWithProblems.length
            ? this.trs.translate(
                'Synchronization complete with errors. Could not synchronize: {{formattedCollectionsWithProblems}}. Please check your notifications.',
                {formattedCollectionsWithProblems},
              )
            : this.trs.translate('Synchronization complete');

          const snackbarTitle = collectionsWithProblems.length
            ? 'SYNC COMPLETE WITH ERRORS'
            : 'SYNC COMPLETE';

          this.snackbar.open(snackbarMessage, snackbarTitle, {
            duration: 10000,
          });
        } else {
          this._hasSyncRerun = true;
          this.runSync();
        }
      });

    this._retrySyncSub = this.dataService.syncErrorEvt.subscribe(evt => {
      let {collection, retrySyncAttempts} = evt;
      collection = collection.replace('_', ' ');
      this.snackbar.open(
        this.trs.translate(`Resyncing {{collection}} attempt {{retrySyncAttempts}}`, {
          collection,
          retrySyncAttempts,
        }),
        'SYNC ERROR',
        {
          duration: 10000,
        },
      );
    });

    this._couldNotSyncSub = this.dataService.couldNotSyncEvt
      .pipe(
        withLatestFrom(this.userDataManager.getActiveUserData()),
        switchMap(([evt, userData]) => {
          if (!userData) return obsOf(null);
          const {collection, error} = evt;
          const msg = this._sanitizeAndTruncateNotificationText(
            this._formatSyncError(error),
            this._maxSyncErrorNotificationLength,
          );
          const notification: InsertModel<Notification> = {
            readers: [],
            type: 'warning',
            icon: 'sync_problem',
            recipients: [userData.id],
            created_at: new Date().toISOString(),
            text: `Collection: ${collection} \n. Error: ${msg}`,
          };

          return this.notificationManager.create(notification).pipe(take(1));
        }),
      )
      .subscribe();

    this.userDisplayName = this.authService.authenticated.pipe(
      switchMap(authEvt => {
        if (authEvt.auth) {
          return this.userDataManager
            .getActiveUserData()
            .pipe(map(userData => userData?.full_name ?? null));
        }
        return obsOf(null);
      }),
    );

    this.availableTokens = this._tokensService.availableTokens;

    this._availableTokensSub = this.availableTokens.pipe(distinctUntilChanged()).subscribe(() => {
      this.tokensCounterActive.next('add');
      setTimeout(() => {
        this.tokensCounterActive.next(null);
      }, 3000);
    });

    this.unreadNotificationsNumber = merge(
      this.dataService.firstReplicationComplete,
      this.authService.authenticated.pipe(filter(authEvt => authEvt.evt === 'init')),
    ).pipe(
      switchMap(() =>
        this.notificationManager.collectionChanged.pipe(
          filter(ccevt => {
            const repCompleteMsg = 'replication cycle complete';
            const docUpdMsg = 'Document updated';
            return this.dataService.config.syncOptions.live
              ? ccevt.action === repCompleteMsg
              : ccevt.action === repCompleteMsg || ccevt.action === docUpdMsg;
          }),
        ),
      ),
      switchMap(() => {
        return this.userDataManager.getActiveUserData().pipe(
          switchMap(userData => {
            if (userData) {
              return this.notificationManager.getUnreadNotificationsNumber(userData.id).pipe(
                tap(num => {
                  if (num > this.lastUnreadNotifications.value && num > 0) {
                    this.triggerNotificationBellRing();
                  }
                  this.lastUnreadNotifications.next(num);
                }),
              );
            }
            return obsOf(0);
          }),
        );
      }),
    );

    this.lastNotifications = merge(
      this.dataService.firstReplicationComplete,
      this.authService.authenticated.pipe(filter(authEvt => authEvt.evt === 'init')),
    ).pipe(
      switchMap(() =>
        this.notificationManager.collectionChanged.pipe(
          filter(ccevt => {
            const repCompleteMsg = 'replication cycle complete';
            const docUpdMsg = 'Document updated';
            return this.dataService.config.syncOptions.live
              ? ccevt.action === repCompleteMsg
              : ccevt.action === repCompleteMsg || ccevt.action === docUpdMsg;
          }),
        ),
      ),
      switchMap(() => {
        return this.userDataManager.getActiveUserData().pipe(
          switchMap(userData => {
            if (userData) {
              return this.notificationManager.getLastNotifications(userData.id);
            }
            return obsOf([]);
          }),
        );
      }),
    );

    this.isAdmin = this._adminRoles.pipe(
      switchMap(roles => this.userGroupManager.isActiveUserAdmin(roles)),
    );
    this.logoutOff = combineLatest([this.isSyncing, this.networkStatusService.isOnline$]).pipe(
      map(([syncing, online]) => syncing || !online),
    );

    const hideChromeFor = (url: string): boolean => {
      const path = url.split('?')[0];
      return !(
        path.includes('login') ||
        path.includes('reset-password') ||
        path.startsWith('/f/')
      );
    };
    this.showNav = this._router.events.pipe(
      filter(evt => evt instanceof NavigationEnd),
      map(evt => hideChromeFor((evt as NavigationEnd).url)),
      // Seed a synchronous value from the current browser URL so a cold/direct
      // load of /f/... is recognised as "no chrome" on first paint. Without this
      // the async pipe yields null until NavigationEnd fires (after the lazy form
      // module loads, ~1s), and the template treats null as "show old toolbar",
      // causing the old header to flash. Use window.location.pathname (not
      // this._router.url) because MainNav is constructed before the initial
      // navigation resolves, when this._router.url is still '/'.
      startWith(hideChromeFor(window.location.pathname)),
      shareReplay(1),
    );
  }

  ngAfterViewInit() {
    this._menuToggleSub = this._menuToggleEvt
      .pipe(
        withLatestFrom(this.breakpointObserver.large),
        tap(([_, res]) => {
          if (res) {
            const currentState = this.extendedSidenav.getValue();
            this.extendedSidenav.next(!currentState);
          } else {
            this.sidenav.toggle();
          }
        }),
      )
      .subscribe();

    this._menuClickSub = this._menuClickEvt
      .pipe(
        withLatestFrom(this.breakpointObserver.large),
        tap(([_, res]) => {
          if (!res) {
            this._menuToggleEvt.emit();
          }
        }),
      )
      .subscribe();

    if (!this.initializationScreenMaxDuration) {
      this._syncLoadingSub = this.dataService.firstReplicationComplete.subscribe(repComplete => {
        this.isLoading.next(!repComplete);
      });
    } else {
      const timeout = this.initializationScreenMaxDuration;

      this._syncLoadingSub = merge(
        this.authService.authenticated.pipe(
          filter(auth => auth.auth == true),
          switchMap(() => timer(timeout).pipe(mapTo(true))),
        ),
        this.dataService.firstReplicationComplete,
      ).subscribe(repComplete => {
        this.isLoading.next(!repComplete);
      });
    }

    this._cdr.detectChanges();
  }

  menuToggle(): void {
    this._menuToggleEvt.emit();
  }

  menuClick(): void {
    this._menuClickEvt.emit();
  }

  setDarkTheme(evt: boolean) {
    this.ts.setDarkMode(evt);
  }

  /**
   * Triggers the notification bell animation by toggling the notification ring state
   */
  triggerNotificationBellRing(): void {
    this.notificationRingState = !this.notificationRingState;
  }

  /**
   * Marks a notification as 'read' by the user and updates the notification readers attribute
   * @param $event The js event
   * @param notification The notification to update
   */
  markNotificationAsRead($event: Event, notification: Notification & {read: boolean}): void {
    $event.stopPropagation();
    $event.preventDefault();
    if (notification == null || notification.read) {
      return;
    }
    this.userDataManager
      .getActiveUserData()
      .pipe(
        switchMap(ud => {
          if (ud == null || ud.id == null) {
            return obsOf(null);
          }
          return this.notificationManager.markNotificationAsRead(notification, ud.id);
        }),
        take(1),
      )
      .subscribe();
  }

  /**
   * Marks all the notification as read by the active user
   * @param $event The js event
   */
  markAllAsRead($event: Event): void {
    $event.stopPropagation();
    $event.preventDefault();
    combineLatest([this.notificationManager.list(), this.userDataManager.getActiveUserData()])
      .pipe(
        switchMap(([notifications, ud]) => {
          if (ud == null || notifications == null) {
            return obsOf(null);
          }
          const patches = notifications.map(notification => {
            const updNotification: Partial<Notification> & {id: string} = {
              readers: [...notification.readers, ud.id],
              id: notification.id,
            };
            return this.notificationManager.patch(updNotification);
          });
          return forkJoin(patches);
        }),
        take(1),
      )
      .subscribe();
  }

  /**
   * Redirects to an url attached to the notification
   * @param $event The js event
   * @param notification The notification to update, providing the redirection url
   */
  goToNotificationUrl($event: Event, notification: Notification & {read: boolean}): void {
    if (notification == null || notification.redirect_url == null) {
      return;
    }
    this.markNotificationAsRead($event, notification);
    this._router.navigateByUrl(notification.redirect_url);
  }

  /**
   * Navigates to the notifications list
   */
  goToNotifications(): void {
    this._router.navigateByUrl('notifications');
  }

  /**
   * Opens the User Area dialog
   * @param expandedPanel the panel that should be expanded by default
   */
  openUserArea(expandedPanel?: UserAreaPanelType): void {
    const dialogConfig = new MatDialogConfig<{
      spinnerImagePath?: string;
      isAdmin?: Observable<boolean>;
      expandedPanel?: UserAreaPanelType;
      backupRestore: boolean | undefined;
    }>();
    dialogConfig.data = {
      spinnerImagePath: this.spinnerImagePath,
      isAdmin: this.isAdmin.pipe(shareReplay(1)),
      expandedPanel,
      backupRestore: this.backupRestore,
    };
    dialogConfig.minWidth = `95vw`;
    dialogConfig.maxWidth = `95vw`;
    this.dialog.open(UserArea, dialogConfig);
  }

  /**
   * Checks if a section is selected in the menu.
   *
   * @param section The section to be checked
   * @returns True if the section is currently selected
   */
  isSectionSelected(section: Section): boolean {
    if (section != null && section == this.currentSection.value) {
      return true;
    }
    return false;
  }

  /**
   * User logout method.
   * @param redirect If true, redirects to the specified url after logging out
   * @param refresh If true, the page is refreshed just after logging out
   * @param clearStorage If true, entries in localStorage for columns presets and new version will be deleted
   * before loggin out.
   */
  logout(
    redirect: boolean = !this.logoutDisabled.value,
    refresh: boolean = false,
    clearStorage: boolean = false,
  ): void {
    this.authService
      .logout()
      .pipe(take(1))
      .subscribe(res => {
        if (res) {
          this.snackbar.open('Successfully logged out', 'LOGOUT', {duration: 5000});
          if (redirect) {
            this._router.navigate([this.authService.authConfig.failedAuthRedirect]);
          }
          if (clearStorage) {
            this._clearStorage();
          }
          if (refresh) {
            window.location.reload();
          }
        } else {
          this.snackbar.open('Offline logout unavailable', 'LOGOUT OFFLINE', {duration: 5000});
        }
      });
  }

  /**
   * Just refreshes the page after deleting the 'new version ready' entry from local storage.
   */
  refreshVersion(): void {
    localStorage.removeItem('dino_new_version_ready');
    window.location.reload();
  }

  /**
   * Clears entries in localStorage for columns presets, filters presets and new version alert.
   */
  private _clearStorage(): void {
    for (let key of Object.keys(localStorage)) {
      if (
        key.includes('columns_') ||
        // The filters of every section, and the presets of the User
        key.startsWith('filters_') ||
        key === 'dino_new_version_ready' ||
        key === 'pandas_dino_api_key' ||
        key === 'dino_gpt_terms_accepted'
      ) {
        localStorage.removeItem(key);
      }
    }
  }

  /**
   * Builds a concise, human-readable message from a sync error.
   * @param error The sync error, if any
   * @returns A single-line message such as `[RC_PUSH] constraint-violation: <message>`
   */
  private _formatSyncError(error?: RxError | RxTypeError): string {
    if (error == null) {
      return 'Unknown sync error';
    }
    const gqlErrors = (
      (error.parameters?.errors ?? []) as {
        message?: string;
        extensions?: {code?: string};
      }[]
    )
      .map(gqlError => [gqlError.extensions?.code, gqlError.message].filter(Boolean).join(': '))
      .filter(Boolean);
    const details = gqlErrors.length
      ? gqlErrors.join(' | ')
      : error.message || 'Unknown sync error';
    return error.code ? `[${error.code}] ${details}` : details;
  }

  private _sanitizeAndTruncateNotificationText(value: string, maxLength: number): string {
    const sanitizedChars = Array.from(value).filter(char => {
      const codePoint = char.codePointAt(0);
      if (codePoint == null) {
        return false;
      }
      // Drop invalid surrogate code points and hidden control chars, keep new lines and tabs.
      if (codePoint >= 0xd800 && codePoint <= 0xdfff) {
        return false;
      }
      return codePoint >= 0x20 || char === '\n' || char === '\t';
    });

    if (sanitizedChars.length <= maxLength) {
      return sanitizedChars.join('');
    }
    return `${sanitizedChars.slice(0, maxLength).join('')}...`;
  }

  /**
   * Forces the start of a graphql replication run cycle
   */
  runSync(): void {
    this.dataService.runSync();
  }

  ngOnDestroy() {
    this._menuClickSub.unsubscribe();
    this._menuToggleSub.unsubscribe();
    this._currentSectionSub.unsubscribe();
    this._onRouterOutletLoadingSub.unsubscribe();
    this._syncLoadingSub.unsubscribe();
    this._replicationCycleCompleteSub.unsubscribe();
    this._retrySyncSub.unsubscribe();
    this._couldNotSyncSub.unsubscribe();
    this._isThereUnsyncedDataSub.unsubscribe();
    this._newVersionCheckSub.unsubscribe();
    this._availableTokensSub.unsubscribe();
  }
}
