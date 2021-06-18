/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Dewco (dewco).
 *
 * Dewco (dewco) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Dewco (dewco) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Dewco (dewco).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  ViewEncapsulation
} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService, LoginComponent} from '@dewco/core/auth';
import {Subscription} from 'rxjs';
import {map} from 'rxjs/operators';

/**
 * A basic material Login component.
 */
@Component({
  selector: 'dewco-login',
  templateUrl: 'login.html',
  styleUrls: ['login.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Login extends LoginComponent implements OnDestroy {
  /**
   * The Login page logo image path/url.
   */
  private _logoImagePath: string;
  get logoImagePath(): string {
    return this._logoImagePath;
  }
  @Input()
  set logoImagePath(url: string) {
    this._logoImagePath = url;
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
      fb: FormBuilder,
      cdr: ChangeDetectorRef,
      private _snackBar: MatSnackBar,
      private _route: ActivatedRoute,
  ) {
    super(authService, router, fb, cdr);

    if (this._route.firstChild) {
      this._expiredSub = this._route.firstChild.data
                             .pipe(
                                 map(data => {
                                   if (data != null && data.isExpired) {
                                     this._snackBar.open(
                                         'Your token has expired. Please log in again.',
                                         'AUTHENTICATION ERROR', {duration: 10000});
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
