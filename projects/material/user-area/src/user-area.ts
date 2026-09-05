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
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  Optional,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthError, AuthService, PasswordMatch, showValidationErrors} from '@dino/core/auth';
import {UserData, UserDataManager, UserGroupManager} from '@dino/core/users';
import {BehaviorSubject, Observable, of as obsOf, Subject} from 'rxjs';
import {map, shareReplay, startWith, switchMap, take, takeUntil, tap} from 'rxjs/operators';
import {TranslocoService} from '@ngneat/transloco';
import {buildInitials, DinoTheme, ThemeService} from '@dino/material/core';
import {BreakpointObserverService} from '@dino/material/breakpoint-observer';
import {AdminUserInteractionsService} from '@dino/material/user-interactions';
import {DataService} from '@dino/core/data';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {ListAction} from '@dino/core/list';
import {Router} from '@angular/router';
import {
  STRIPE_PAYMENT_CONFIG,
  StripePaymentConfig,
  TokensService,
} from '@dino/material/stripe-payment';
import {UserAreaPanelType, UserAreaTab} from './user-area-panel-type';
import {UI_TOUR_SERVICE_CONFIG, UITourConfig, UITourService} from '@dino/material/ui-tour-service';

/**
 * The tabs, in the order they are shown. Password, AI and DINO Theme are always
 * available; Backup and Tutorials are added by 'tabs' when their preconditions hold.
 */
const PASSWORD_TAB: UserAreaTab = {
  id: 'password',
  label: 'Password',
  title: 'Change Password',
  description: 'Choose a new password for your account.',
};
const AI_TAB: UserAreaTab = {
  id: 'ai',
  label: 'AI',
  title: 'AI',
  description: 'Your DINO-AI access key and the credits available to you.',
};
const THEME_TAB: UserAreaTab = {
  id: 'theme',
  label: 'DINO Theme',
  title: 'DINO Theme',
  description: 'Colors applied to this instance. Can be saved as a preset.',
};
const BACKUP_TAB: UserAreaTab = {
  id: 'backup',
  label: 'Backup and Restore',
  title: 'Backup and Restore',
  description: 'Export a full copy of the data, or restore a previous backup.',
};
const TUTORIAL_TAB: UserAreaTab = {
  id: 'tutorial',
  label: 'Tutorials',
  title: 'Tutorials',
  description: 'Take the guided tour of Dino again.',
};

/**
 * The User Area page: everything the signed in user manages about their own account -
 * their password, their DINO-AI key and credits, the instance theme, data backup and
 * restore, and the guided tour.
 *
 * It is a routed page rather than a dialog. The active tab is driven from the outside
 * through 'activeTab' / 'tabChange', so that the hosting app can keep it in the URL
 * without this component having to know the route it lives at.
 */
@Component({
  selector: 'dino-user-area',
  styleUrls: ['user-area.scss'],
  templateUrl: 'user-area.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class UserArea implements OnDestroy {
  /**
   * If true, Backup/Restore is available to the Admin in the User Area
   */
  @Input() backupRestore: boolean | undefined;

  /**
   * The Custom loading spinner image path
   */
  @Input() spinnerImagePath: string | undefined;

  /**
   * The roles granting Admin permissions, used to gate the Backup tab and the db export.
   * Resolved here rather than taken as a boolean so the page owns one admin check, the
   * same way the shell does.
   */
  @Input()
  set adminRoles(roles: string[]) {
    if (roles != null) {
      this._adminRoles.next(roles);
    }
  }
  private readonly _adminRoles: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([
    'admin',
  ]);

  /**
   * True if the active user is an Admin.
   */
  readonly isAdmin: Observable<boolean>;

  /**
   * The tab to show, as named by the host. A slug this user has no tab for falls back to
   * the first one, and 'tabChange' reports the correction so the host can fix the URL.
   */
  @Input() activeTab: UserAreaPanelType | null | undefined;

  /**
   * Emitted when the user picks another tab, for the host to put in the URL.
   */
  @Output() readonly tabChange: EventEmitter<UserAreaPanelType> =
    new EventEmitter<UserAreaPanelType>();

  /**
   * The tabs currently available, in display order.
   */
  readonly tabs: Observable<UserAreaTab[]>;

  /**
   * The active User Data
   */
  readonly userData: Observable<UserData | null>;

  /**
   * The active user initials, shown in the page header avatar.
   */
  readonly userInitials: Observable<string | null>;

  /**
   * The Change Password FormGroup.
   */
  readonly changePassForm: UntypedFormGroup;

  /**
   * The Dino Theme customization FormGroup.
   */
  readonly dinoSaveThemeForm: UntypedFormGroup;

  /**
   * True if the Change Password form or a restore is currently processing a request.
   */
  processing: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * Error is True if authentication was not successful.
   */
  private _changePassError: AuthError = {error: false, message: null};
  get changePassError(): AuthError {
    return this._changePassError;
  }

  /**
   * Displays the login/signup validation errors
   */
  readonly showValErrors = showValidationErrors;

  /**
   * The minimum length a new password must have, mirrored in the field hint.
   */
  readonly passwordMinLength: number = 9;

  /**
   * True if the submit button for changing the password is disabled.
   */
  readonly changePassDisabled: Observable<boolean>;

  /**
   * True while the API key is masked.
   */
  hide_api_key: boolean = true;

  /**
   * What is shown in place of the API key while it is masked.
   */
  readonly maskedApiKey: string = '\u2022'.repeat(20);

  /**
   * The restore caveat. Held here rather than inline so the translation key cannot be
   * broken up by the template formatter.
   */
  readonly restoreWarning: string = 'Restoring overwrites the current data';

  /**
   * The stored Pandino API Key. Null when the account has no DINO-AI access; the key is
   * provisioned by TokensService.checkPandinoUser() at login, not entered by hand.
   */
  storedPandinoAPIKey: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  /**
   * Available Pandino Tokens
   */
  availablePandinoTokens: Observable<number | null>;

  /**
   * The primary color of Dino Theme.
   */
  primaryColor: string;

  /**
   * The accent color of Dino Theme.
   */
  accentColor: string;

  /**
   * The warning color of Dino Theme.
   */
  warningColor: string;

  /**
   * An observable of all names of loadable theme presets
   */
  themePresetOptions: Observable<string[]>;

  /**
   * Sanitized db export blob
   */
  dbDownloadUrl: Observable<SafeUrl | null>;

  /**
   * The selected file
   */
  private _file?: Blob;

  /**
   * Main unsub subject.
   * Used for unsubscribing all subscriptions.
   */
  private _mainUnsubscribe: Subject<void> = new Subject();

  constructor(
    @Optional() @Inject(STRIPE_PAYMENT_CONFIG) readonly stripeConfig: StripePaymentConfig | null,
    @Inject(UI_TOUR_SERVICE_CONFIG) readonly uiServiceConfig: UITourConfig,
    private _udm: UserDataManager,
    private _userGroupManager: UserGroupManager,
    private _fb: UntypedFormBuilder,
    private _authService: AuthService,
    private _cdr: ChangeDetectorRef,
    private _snackBar: MatSnackBar,
    private _ds: DataService,
    private _ts: TranslocoService,
    private _sanitizer: DomSanitizer,
    private _aui: AdminUserInteractionsService,
    private _tokensService: TokensService,
    private _router: Router,
    private _tourService: UITourService,
    public themeService: ThemeService,
    readonly breakpointObserver: BreakpointObserverService,
  ) {
    // shareReplay: isAdmin feeds both the tab list and the db export, and the permission
    // lookup should not run once per subscriber.
    this.isAdmin = this._adminRoles.pipe(
      switchMap(roles => this._userGroupManager.isActiveUserAdmin(roles)),
      shareReplay(1),
    );
    this.dbDownloadUrl = obsOf(null);
    this.userData = this._udm.getActiveUserData();
    this.userInitials = this.userData.pipe(
      map(userData => (userData?.full_name ? buildInitials(userData.full_name) : null)),
    );
    const currentTheme = this.themeService.currentThemeVal;
    this.primaryColor = currentTheme?.primary ?? '#000000';
    this.accentColor = currentTheme?.accent ?? '#000000';
    this.warningColor = currentTheme?.warning ?? '#000000';

    this.changePassForm = this._fb.group({
      current_password: [null, [Validators.required, Validators.minLength(8)]],
      password: [null, [Validators.required, Validators.minLength(this.passwordMinLength)]],
      confirm_password: [
        null,
        [Validators.required, Validators.minLength(this.passwordMinLength), PasswordMatch],
      ],
    });

    this.storedPandinoAPIKey.next(localStorage.getItem('pandas_dino_api_key'));

    this.availablePandinoTokens = this._tokensService.availableTokens;

    this.dinoSaveThemeForm = this._fb.group({
      primary: [this.primaryColor, Validators.required],
      accent: [this.accentColor, Validators.required],
      warning: [this.warningColor, Validators.required],
      presetName: ['', Validators.required],
    });

    this.changePassDisabled = this.changePassForm.valueChanges.pipe(
      map(_ => !this.changePassForm.valid),
      startWith(!this.changePassForm.valid),
    );

    this.themePresetOptions = this.dinoSaveThemeForm.get('presetName')!.valueChanges.pipe(
      startWith(''),
      map(value => {
        const options = Object.keys(localStorage).filter(
          key => key.includes('dino_theme_') && key !== 'dino_theme_default',
        );
        const presetNames = options.map(k => k.replace('dino_theme_', ''));
        if (!value) {
          return presetNames;
        }
        return this._filter(value, presetNames);
      }),
    );

    // Nothing emits until the admin check settles, so the tab group is created already
    // holding its final set of tabs. Were it to render first without the Backup tab, a
    // deep link to it would be 'corrected' away before the answer arrived.
    this.tabs = this.isAdmin.pipe(
      map(isAdmin => {
        const tabs: UserAreaTab[] = [PASSWORD_TAB, AI_TAB, THEME_TAB];
        if (this.backupRestore && isAdmin) {
          tabs.push(BACKUP_TAB);
        }
        if (this.uiServiceConfig) {
          tabs.push(TUTORIAL_TAB);
        }
        return tabs;
      }),
      shareReplay(1),
    );

    this.tabs.pipe(takeUntil(this._mainUnsubscribe)).subscribe(tabs => {
      // A URL naming a tab this user does not have: ask the host to correct it.
      if (this.activeTab != null && !tabs.some(tab => tab.id === this.activeTab)) {
        this.tabChange.emit(tabs[0].id);
      }
    });

    this._ds.dbImportedEvent.pipe(takeUntil(this._mainUnsubscribe)).subscribe(evt => {
      this.processing.next(false);
      this._snackBar.open(
        this._ts.translate(
          evt
            ? 'Data importe correctly in your local Database'
            : 'There was an error importing the Data. Please check the import file.',
        ),
        this._ts.translate(evt ? 'DATA IMPORTED' : 'ERROR IMPORTING DATA'),
        {
          duration: 10000,
        },
      );
      if (evt) {
        this._router.navigateByUrl('/', {replaceUrl: true});
      }
    });

    this._exportDatabase();
  }

  /**
   * Exports the Db instance content to a json file
   */
  private _exportDatabase(): void {
    this.dbDownloadUrl = this.isAdmin.pipe(
      switchMap(isAdmin => {
        if (!isAdmin) {
          return obsOf(null);
        }
        return this._ds
          .exportDatabase()
          .pipe(
            map(blob => this._sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(blob))),
          );
      }),
    );
  }

  /**
   * The position of a tab in the visible list. An unknown tab collapses to the first one,
   * so the page still renders something while the host corrects the URL.
   * @param tabs The visible tabs
   * @param tab The tab to locate
   */
  tabIndex(tabs: UserAreaTab[], tab: UserAreaPanelType | null | undefined): number {
    const index = tabs.findIndex(candidate => candidate.id === tab);
    return index === -1 ? 0 : index;
  }

  /**
   * Maps a tab index back to its slug through the very array that produced it, so that a
   * hidden tab can never shift the mapping.
   * @param tabs The tab list the index refers to
   * @param index The index emitted by the tab group
   */
  selectTab(tabs: UserAreaTab[], index: number): void {
    const tab = tabs[index];
    // The group also emits when 'selectedIndex' changes from the outside; only report a
    // change the user actually made, or the host would navigate to the URL it just set.
    if (tab == null || tab.id === this.activeTab) {
      return;
    }
    this.tabChange.emit(tab.id);
  }

  /**
   * Keeps the rendered tabs identified by slug. Without it a new tab list rebuilds every
   * tab body and wipes whatever the user had typed into the other tabs.
   */
  trackTabById = (_: number, tab: UserAreaTab): UserAreaPanelType => tab.id;

  /**
   * Sets the theme Primary Color. The colors are not applied to the app as they are
   * picked - only the preview follows them, until saveDinoTheme().
   */
  setPrimaryColor(col: string) {
    this.primaryColor = col;
    this.dinoSaveThemeForm.get('primary')?.setValue(col);
  }

  /**
   * Sets the theme Accent Color
   */
  setAccentColor(col: string) {
    this.accentColor = col;
    this.dinoSaveThemeForm.get('accent')?.setValue(col);
  }

  /**
   * Sets the theme Warning Color
   */
  setWarningColor(col: string) {
    this.warningColor = col;
    this.dinoSaveThemeForm.get('warning')?.setValue(col);
  }

  /**
   * Applies the edited colors to the app and saves them as a Dino Theme preset
   */
  saveDinoTheme() {
    const dinoTheme: DinoTheme = {
      primary: this.primaryColor,
      accent: this.accentColor,
      warning: this.warningColor,
      presetName: this.dinoSaveThemeForm.get('presetName')?.value,
      isDarkTheme: this.themeService.isDark(),
      isAutoContrast: true,
    };
    // Saving is the point at which the edits leave the preview and reach the app.
    this.themeService.setTheme(dinoTheme);
    this.themeService.saveDinoTheme(dinoTheme);
    this._snackBar.open(
      this._ts.translate('Theme saved and set as default'),
      this._ts.translate('THEME SAVED'),
      {
        duration: 10000,
      },
    );
  }

  /**
   * Loads a Dino Theme preset
   */
  loadDinoTheme() {
    const presetName = this.dinoSaveThemeForm.get('presetName')?.value;
    const loadedTheme = this.themeService.loadDinoTheme(presetName);
    this.setPrimaryColor(loadedTheme?.primary ?? '#000000');
    this.setAccentColor(loadedTheme?.accent ?? '#000000');
    this.setWarningColor(loadedTheme?.warning ?? '#000000');
    this._snackBar.open(
      this._ts.translate('Theme loaded and set as default'),
      this._ts.translate('THEME LOADED'),
      {
        duration: 10000,
      },
    );
  }

  /**
   * Discards the color edits and goes back to the theme currently applied
   */
  resetDinoTheme() {
    const currentTheme = this.themeService.currentThemeVal;
    this.setPrimaryColor(currentTheme?.primary ?? '#000000');
    this.setAccentColor(currentTheme?.accent ?? '#000000');
    this.setWarningColor(currentTheme?.warning ?? '#000000');
  }

  /**
   * Sets the dark mode on/off
   * @param evt If true, dark theme is set
   */
  setDarkTheme(evt: boolean) {
    this.themeService.setDarkMode(evt);
  }

  /**
   * Opens a snackbar message "copied to clipboard"
   */
  copyToClipboard() {
    this._snackBar.open(this._ts.translate('Copied to clipboard'), this._ts.translate('COPIED'), {
      duration: 10000,
    });
  }

  /**
   * Starts the UI Tour tutorial
   */
  startTutorial() {
    if (this.uiServiceConfig) this._tourService.start(true);
  }

  /**
   * User Change Password method.
   */
  changePassword(): void {
    if (!this.changePassForm.valid || this.processing.value) {
      return;
    }
    this.processing.next(true);
    this.userData
      .pipe(
        switchMap(ud => {
          if (!ud) {
            return obsOf(false);
          }
          const credentials = {
            email: ud.email,
            password: this.changePassForm.get('current_password')?.value,
          };
          const newPassword = this.changePassForm.get('password')?.value;
          return this._authService.changePassword(credentials, newPassword);
        }),
        take(1),
      )
      .subscribe({
        next: res => {
          if (res) {
            this._setChangePassError({error: false, message: null});
            this.passwordChanged();
          } else {
            this._setChangePassError({error: true, message: null});
          }
          this.processing.next(false);
        },
        error: err => {
          if (err.status && err.status === 200) {
            this._setChangePassError({error: false, message: null});
            this.passwordChanged();
          } else {
            this._setChangePassError({
              error: true,
              message: err.error.message ?? this._ts.translate('Incorrect password'),
            });
          }
          this.processing.next(false);
        },
      });
  }

  /**
   * Signals the successful Password change and empties the form
   */
  passwordChanged(): void {
    this.changePassForm.reset();
    this._snackBar.open(
      this._ts.translate('Password changed'),
      this._ts.translate('PASSWORD CHANGED'),
      {duration: 10000},
    );
  }

  /**
   * Called when a JSON file is chosen to restore the db in the input
   * @param event The input file selection event
   */
  onJsonImportfileSelected(event: any): void {
    if (event.target.files.length === 0) {
      return;
    }
    this._file = event.target.files[0];
    // The dialog used to close on cancel, which reset the input with it. On a page it
    // stays, and an input still holding the file will not fire 'change' for that same
    // file again.
    const input = event.target as HTMLInputElement;
    const action: ListAction = {actionType: 'restore', askConfirm: true};

    this._aui
      .askConfirm(
        action,
        this._ts.translate(
          `Are you SURE you want to restore this Data file? All of the imported Data will be written into your local Database. \n
          Any Data with the same ID of an imported one will be OVERWRITTEN.`,
        ),
      )
      .pipe(
        switchMap(confirmation => {
          input.value = '';
          if (!confirmation || this._file == null) {
            return obsOf(null);
          }
          this.processing.next(true);
          // Restore reassigns ownership of imported form/report data to the current
          // user, so resolve the active user's id and pass it to the import.
          return this._udm.getActiveUserData().pipe(
            take(1),
            tap(userData => this._ds.importDatabase(this._file!, userData?.id)),
          );
        }),
        take(1),
      )
      .subscribe();
  }

  /**
   * Opens a Stripe Payment dialog
   */
  openPayment() {
    this._tokensService.openPayment('stripe-checkout', 25);
  }

  private _filter(value: string, options: string[]): string[] {
    const filterValue = value.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _setChangePassError(changePassErr: AuthError): void {
    this._changePassError = changePassErr;
    this._cdr.markForCheck();
  }

  ngOnDestroy(): void {
    this._mainUnsubscribe.next();
    this._mainUnsubscribe.complete();
  }
}
