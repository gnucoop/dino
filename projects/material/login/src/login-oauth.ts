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

import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {NhostClient} from '@nhost/nhost-js';
import {ExternalAuthProvider} from '@dino/core/auth/src/external-auth-type';

/**
 * A basic material Login component.
 */
@Component({
  selector: 'dino-login-oauth',
  templateUrl: 'login-oauth.html',
  styleUrls: ['login-oauth.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class LoginOauth {
  /**
   * NHost js client instance
   */
  @Input() nhost: NhostClient | null = null;

  /**
   * Users can signin with external OAuth providers listed here.
   */
  @Input() externalOAuthProviders: ExternalAuthProvider[] | undefined;

  /**
   * OAuth providers names mapped object
   */
  oAuthProvidersNames: {[Property in ExternalAuthProvider]: string} = {'azuread': 'Microsoft', 'google': 'Google'};

  constructor() {}

  signInOauth(provider: ExternalAuthProvider) {
    if (this.nhost == null || !this.externalOAuthProviders) return;
    this.nhost.auth.signIn({
      provider,
      options: {redirectTo: '/login/external_auth'},
    });
  }

  // testSignInAzure() {
  //   if (this.nhost == null) return;
  //   this.nhost.auth.signIn({
  //     provider: 'azuread',
  //     options: {redirectTo: 'http://localhost:4200/login/external_auth'},
  //   });
  // }

  // testSignInGoogle() {
  //   if (this.nhost == null) return;
  //   this.nhost.auth.signIn({
  //     provider: 'google',
  //     options: {redirectTo: 'http://localhost:4200/login/external_auth'},
  //   });
  // }

  // retrieveAccessToken() {
  //   if (this.nhost == null) return;
  //   const rt = this.nhost.auth.getAccessToken();
  //   console.log(rt);
  // }

  // retrieveSessionAndUser() {
  //   if (this.nhost == null) return;
  //   const session = this.nhost.auth.getSession();
  //   const user = this.nhost.auth.getUser();
  //   console.log(session, user);
  // }
}
