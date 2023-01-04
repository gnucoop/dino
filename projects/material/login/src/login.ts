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
  Input,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import {UntypedFormBuilder} from '@angular/forms';
import {MatLegacySnackBar as MatSnackBar} from '@angular/material/legacy-snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService, LoginComponent} from '@dino/core/auth';
import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {TranslocoService} from '@ngneat/transloco';

/**
 * A basic material Login component.
 */
@Component({
  selector: 'dino-login',
  templateUrl: 'login.html',
  styleUrls: ['login.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Login extends LoginComponent implements OnDestroy {
  /**
   * The label text displayed for the "Full Name" signup form field.
   */
  @Input() fullNameLabel: string | undefined;
  /**
   * If true, users can signup and create a new account.
   */
  readonly signupAvailable: boolean | undefined;

  /**
   * If true, users can change their password.
   */
  readonly resetPassAvailable: boolean | undefined;

  /**
   * The Login page logo image path/url.
   */
  private _logoImagePath: string = '';
  get logoImagePath(): string {
    return this._logoImagePath;
  }
  @Input()
  set logoImagePath(url: string) {
    this._logoImagePath = url;
  }

  /**
   * The login form visibility optional condition.
   */
  private _loginFormVisible?: Observable<boolean>;
  get loginFormVisible(): Observable<boolean> | undefined {
    return this._loginFormVisible;
  }
  @Input()
  set loginFormVisible(visibility: Observable<boolean> | undefined) {
    this._loginFormVisible = visibility;
  }

  /**
   * Subscribes to the "expired" data parameter of the route.
   * If true, an error message is displayed, asking the user to
   * log in again.
   */
  private _expiredSub: Subscription = Subscription.EMPTY;

  constructor(
    authService: AuthService,
    router: Router,
    fb: UntypedFormBuilder,
    cdr: ChangeDetectorRef,
    snackBar: MatSnackBar,
    ts: TranslocoService,
    private _route: ActivatedRoute,
  ) {
    super(authService, router, fb, cdr, snackBar, ts);

    this.signupAvailable = authService.authConfig.signUp;
    this.resetPassAvailable = authService.authConfig.resetPassword;

    if (this._route.data) {
      this._expiredSub = this._route.data
        .pipe(
          map(data => {
            if (data != null) {
              if (data['isExpired']) {
                snackBar.open(
                  `There was a problem connecting to the
                             Authentication server or your token has expired.
                             Please log in again.`,
                  'AUTHENTICATION ERROR',
                  {duration: 10000},
                );
              }
              if (data['syncError']) {
                snackBar.open(
                  `There was a problem during syncing process. If you are importing
                        forms, please check them and log in again.`,
                  'SYNC ERROR',
                  {duration: 15000},
                );
              }
            }
          }),
        )
        .subscribe();
    }
  }

  ngOnDestroy() {
    this._expiredSub.unsubscribe();
  }
}
