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
  Inject,
  isDevMode,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthError, AuthService, PasswordMatch, showValidationErrors} from '@dino/core/auth';
import {UserData, UserDataManager} from '@dino/core/users';
import {BehaviorSubject, Observable, of as obsOf, Subject} from 'rxjs';
import {map, startWith, switchMap, take, takeUntil} from 'rxjs/operators';
import {TranslocoService} from '@ngneat/transloco';
import {DinoTheme, ThemeService} from '@dino/material/core';
import {BreakpointObserverService} from '@dino/material/breakpoint-observer';
import {AdminUserInteractionsService} from '@dino/material/user-interactions';
import {DataService} from '@dino/core/data';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {ListAction} from '@dino/core/list';
import {Router} from '@angular/router';
import {STRIPE_PAYMENT_CONFIG, StripePaymentConfig} from '@dino/material/stripe-payment';
import {HttpClient} from '@angular/common/http';
import {ErrorHandlerMessageService} from '@dino/core/error-handler';
import {StripeService} from '@dino/material/stripe-payment';

/**
 * Dialog component that shows Additional Filters, grouped and divided in Tabs.
 * It may contain dino-search-filters-chips and multiple dino-search-filters-widget.
 * It is usually associated with a main filters component that displays Basic Filters
 * (eg. dino-search-filters-bar).
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
  backupRestore: boolean | undefined;
  /**
   * True if the active user is an Admin
   */
  isAdmin: Observable<boolean>;
  /**
   * The Custom loading spinner image path
   */
  spinnerImagePath: string | undefined;
  /**
   * The active User Data
   */
  readonly userData: Observable<UserData | null>;
  /**
   * The Change Password FormGroup.
   */
  readonly changePassForm: UntypedFormGroup;
  /**
   * The API Keys FormGroup.
   */
  readonly apiKeysForm: FormGroup<{pandino_api_key: FormControl<string>}>;
  /**
   * The Dino Theme customization FormGroup.
   */
  readonly dinoSaveThemeForm: UntypedFormGroup;
  /**
   * True if the Change Password or Email forms are currently processing a request.
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
   * Error is True if API Key authentication was not successful.
   */
  private _apiKeyError: AuthError = {error: false, message: null};
  get apiKeyError(): AuthError {
    return this._apiKeyError;
  }
  /**
   * Displays the login/signup validation errors
   */
  readonly showValErrors = showValidationErrors;
  /**
   * True if the submit button for changing the password is disabled.
   */
  readonly changePassDisabled: Observable<boolean>;

  /**
   * True if the api key visibility toggle is on "hide" mode
   */
  hide_api_key: boolean = true;

  /**
   * The stored Pandino API Key
   */
  storedPandinoAPIKey: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  /**
   * Available Pandino Tokens
   */
  availablePandinoTokens: Observable<string | null>;

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
    private _udm: UserDataManager,
    private _fb: UntypedFormBuilder,
    private _authService: AuthService,
    private _cdr: ChangeDetectorRef,
    private _snackBar: MatSnackBar,
    private _ds: DataService,
    private _ts: TranslocoService,
    private _sanitizer: DomSanitizer,
    private _aui: AdminUserInteractionsService,
    private _stripeService: StripeService,
    private _router: Router,
    private _http: HttpClient,
    private _ehms: ErrorHandlerMessageService,
    public themeService: ThemeService,
    public dialogRef: MatDialogRef<UserArea>,
    readonly breakpointObserver: BreakpointObserverService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      spinnerImagePath?: string;
      isAdmin?: Observable<boolean>;
      backupRestore: boolean | undefined;
    },
    @Inject(STRIPE_PAYMENT_CONFIG) readonly stripeConfig: StripePaymentConfig,
  ) {
    this.spinnerImagePath = data.spinnerImagePath;
    this.isAdmin = data.isAdmin ?? obsOf(false);
    this.backupRestore = data.backupRestore;
    this.dbDownloadUrl = obsOf(null);
    this.userData = this._udm.getActiveUserData();
    const currentTheme = this.themeService.currentThemeVal;
    this.primaryColor = currentTheme?.primary ?? '#000000';
    this.accentColor = currentTheme?.accent ?? '#000000';
    this.warningColor = currentTheme?.warning ?? '#000000';

    this.changePassForm = this._fb.group({
      current_password: [null, [Validators.required, Validators.minLength(8)]],
      password: [null, [Validators.required, Validators.minLength(9)]],
      confirm_password: [null, [Validators.required, Validators.minLength(9), PasswordMatch]],
    });

    this.storedPandinoAPIKey.next(localStorage.getItem('pandas_dino_api_key'));
    this.apiKeysForm = this._fb.group({
      pandino_api_key: [this.storedPandinoAPIKey.value, [Validators.required]],
    });

    this.availablePandinoTokens = this._stripeService.availableTokens;

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
      map(([value]) => {
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

    this._ds.dbImportedEvent.pipe(takeUntil(this._mainUnsubscribe)).subscribe(evt => {
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
      this.closeDialog();
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
   * Sets the theme Primary Color
   */
  setPrimaryColor(col: string) {
    this.primaryColor = col;
    this.themeService.setPrimaryColor(col);
  }

  /**
   * Sets the theme Accent Color
   */
  setAccentColor(col: string) {
    this.accentColor = col;
    this.themeService.setAccentColor(col);
  }

  /**
   * Sets the theme Warning Color
   */
  setWarningColor(col: string) {
    this.warningColor = col;
    this.themeService.setWarnColor(col);
  }

  /**
   * Saves a Dino Theme preset
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
    this.themeService.saveDinoTheme(dinoTheme);
    this.closeDialog();
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
    this.primaryColor = loadedTheme?.primary ?? '#000000';
    this.accentColor = loadedTheme?.accent ?? '#000000';
    this.warningColor = loadedTheme?.warning ?? '#000000';
    this.closeDialog();
    this._snackBar.open(
      this._ts.translate('Theme loaded and set as default'),
      this._ts.translate('THEME LOADED'),
      {
        duration: 10000,
      },
    );
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
   * Validates API Key
   */
  validateAPIKey(key: string | undefined): void {
    if (
      !key ||
      !this.apiKeysForm.valid ||
      this.processing.value ||
      !this.stripeConfig ||
      !this.stripeConfig.pandinoUrl
    ) {
      return;
    }
    this.processing.next(true);
    const userInfo = this._authService.getUserInfo();
    if (!userInfo || !userInfo.email) return;
    const headers = {'X-API-KEY': key, 'X-USER-EMAIL': userInfo.email};
    this._http
      .post(`${this.stripeConfig.pandinoUrl}/validateapikey`, null, {headers})
      .pipe(take(1))
      .subscribe({
        next: res => {
          setTimeout(() => {
            this.processing.next(false);
          }, 1000);
          localStorage.setItem('pandas_dino_api_key', key);
          this._snackBar.open(
            this._ts.translate(
              'Your API Key was successfully authenticated. You can check it any time in your User Area',
            ),
            this._ts.translate('PANDINO: AUTHENTICATION SUCCESSFUL!'),
            {duration: 10000},
          );
          this.storedPandinoAPIKey.next(key);
          this._stripeService.refreshPandinoTokensEvt.emit();
          this._cdr.detectChanges();
          if (isDevMode()) {
            console.log(res);
          }
        },
        error: err => {
          setTimeout(() => {
            this.processing.next(false);
          }, 1000);
          if (err.error.error && err.error.error === 'Invalid API key') {
            this.apiKeysForm.get('pandino_api_key')?.setErrors({'invalid': true});
            this._cdr.detectChanges();
          } else {
            this._snackBar.open(
              this._ts.translate('PANDINO is not responding at the moment. Please try later'),
              this._ts.translate('PANDINO NOT RESPONDING'),
              {
                duration: 5000,
              },
            );
          }
        },
      });
  }

  /**
   * User Change Password method.
   */
  changePassword(): void {
    if (!this.changePassForm.valid || this.processing.value) {
      return;
    }
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
   * Signals the successful Password change and closes the User Area dialog
   */
  passwordChanged(): void {
    this._snackBar.open(
      this._ts.translate('Password changed'),
      this._ts.translate('PASSWORD CHANGED'),
      {duration: 10000},
    );
    this.closeDialog();
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
        map(confirmation => {
          if (!confirmation || this._file == null) {
            this.closeDialog();
            return null;
          }
          this.processing.next(true);
          return this._ds.importDatabase(this._file);
        }),
        take(1),
      )
      .subscribe();
  }

  /**
   * Opens a Stripe Payment dialog
   */
  openPayment() {
    this._stripeService.openPayment('stripe-checkout', 25);
  }

  /**
   * Closes the dialog.
   */
  closeDialog() {
    this.dialogRef.close(false);
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
