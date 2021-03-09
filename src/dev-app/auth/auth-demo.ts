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

import {Component} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {AuthService, Credentials} from '@dewco/core/auth';

@Component({
  selector: 'auth-demo.html',
  templateUrl: 'auth-demo.html',
  styleUrls: ['auth-demo.css'],
})
export class AuthDemo {
  loginResult = '';
  readonly loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });

  constructor(private _authService: AuthService) {}

  login(): void {
    if (!this.loginForm.valid) {
      return;
    }

    this._authService.login(this.loginForm.value as Credentials)
        .subscribe(loggedIn => (this.loginResult = loggedIn ? 'success' : 'failure'));
  }
}
