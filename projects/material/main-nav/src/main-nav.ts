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
import {DataService, MetricsService, PermissionContextService} from '@dino/core/data';
import {UserDataManager, UserGroupManager} from '@dino/core/users';
import {BreakpointObserverService} from '@dino/material/breakpoint-observer';
import {UserArea} from '@dino/material/user-area';
import {BehaviorSubject, combineLatest, Observable, of as obsOf, Subscription} from 'rxjs';
import {filter, map, shareReplay, switchMap, take, tap, withLatestFrom} from 'rxjs/operators';

import {Section} from './section-interface';

/**
 * Dino Main component, containing the toolbar and the sidebar navigation.
 */
@Component({
  selector: 'dino-main-nav',
  templateUrl: 'main-nav.html',
  styleUrls: ['main-nav.scss'],
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
    if (elementRef.isLoading) {
      this._onRouterOutletLoadingSub.unsubscribe();
      this._onRouterOutletLoadingSub = elementRef.isLoading.subscribe({
        next: (res: boolean) => {
          this.isLoading.next(res);
        },
      });
    }
  }

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
   * If true, the logout button temporarily off.
   */
  readonly logoutOff: Observable<boolean>;

  /**
   * Additional action icons that can redirect to the specified urls
   */
  readonly linkIcons: BehaviorSubject<{icon: string; url: string}[]> = new BehaviorSubject<
    {icon: string; url: string}[]
  >([]);
  @Input()
  set setLinkIcons(icons: {icon: string; url: string}[]) {
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
    readonly snackbar: MatSnackBar,
    readonly pcs: PermissionContextService,
    public dialog: MatDialog,
    private _router: Router,
    private _cdr: ChangeDetectorRef,
  ) {
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

    this.isAdmin = this._adminRoles.pipe(
      switchMap(roles => this.userGroupManager.isActiveUserAdmin(roles)),
    );
    this.logoutOff = combineLatest([this.isSyncing, this.networkStatusService.isOnline$]).pipe(
      map(([syncing, online]) => syncing || !online),
    );

    this.showNav = this._router.events.pipe(
      filter(evt => evt instanceof NavigationEnd),
      map(evt => {
        const navEndEvt = evt as NavigationEnd;
        if (navEndEvt.url.includes('login')) {
          return false;
        }
        return true;
      }),
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

    this._cdr.detectChanges();
  }

  menuToggle(): void {
    this._menuToggleEvt.emit();
  }

  menuClick(): void {
    this._menuClickEvt.emit();
  }

  /**
   * Opens the User Area dialog
   */
  openUserArea(): void {
    const dialogConfig = new MatDialogConfig();
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
   */
  logout(redirect: boolean = !this.logoutDisabled.value): void {
    this.authService
      .logout()
      .pipe(take(1))
      .subscribe(res => {
        if (res) {
          this.snackbar.open('Successfully logged out', 'LOGOUT', {duration: 5000});
          if (redirect) {
            this._router.navigate([this.authService.authConfig.failedAuthRedirect]);
          }
        } else {
          this.snackbar.open('Offline logout unavailable', 'LOGOUT OFFLINE', {duration: 5000});
        }
      });
  }

  ngOnDestroy() {
    this._menuClickSub.unsubscribe();
    this._menuToggleSub.unsubscribe();
    this._currentSectionSub.unsubscribe();
    this._onRouterOutletLoadingSub.unsubscribe();
  }
}
