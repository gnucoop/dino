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

import {HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthService, buildAuthorizationHeader} from '@dino/core/auth';
import {DataService} from '@dino/core/data';
import {Apollo, gql} from 'apollo-angular';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {UserData} from './user-data';

/**
 * The user to create with {@link UserAccountService.createAccount}.
 */
export interface NewUserAccount {
  email: string;
  password: string;
  full_name: string;
  user_group_ids: string[];
  /**
   * Two-letter locale of the account's emails; the server falls back to 'en'.
   */
  locale?: string | null;
}

/**
 * Why a user could not be created:
 * - `email-in-use`: a login with that e-mail already exists;
 * - `not-admin`: the server does not consider the caller a Dino admin;
 * - `offline`: the server could not be reached;
 * - `unknown`: anything else.
 */
export type UserAccountErrorReason = 'email-in-use' | 'not-admin' | 'offline' | 'unknown';

/**
 * Error thrown by {@link UserAccountService.createAccount}.
 */
export class UserAccountError extends Error {
  constructor(readonly reason: UserAccountErrorReason, message: string) {
    super(message);
    this.name = 'UserAccountError';
  }
}

const CREATE_DINO_USER = gql<
  {create_dino_user: UserData[]},
  {
    email: string;
    password: string;
    fullName: string;
    groups: string[];
    locale: string | null;
  }
>`
  mutation CreateDinoUser(
    $email: String!
    $password: String!
    $fullName: String!
    $groups: jsonb!
    $locale: String
  ) {
    create_dino_user(
      args: {
        email: $email
        password: $password
        full_name: $fullName
        user_group_ids: $groups
        locale: $locale
      }
    ) {
      id
      created_at
      updated_at
      full_name
      email
      user_group_ids
      user_auth_ref_id
      disabled
      is_deleted
    }
  }
`;

/**
 * Creates user accounts on the server. The server function creates the login and the Dino user
 * in one transaction and only accepts calls from Dino admins, so this needs a connection.
 */
@Injectable({providedIn: 'root'})
export class UserAccountService {
  constructor(
    private _apollo: Apollo,
    private _authService: AuthService,
    private _dataService: DataService,
  ) {}

  /**
   * Creates the login and the Dino user. The new user_data row is not written locally: it
   * reaches the device through the user_data pull, which is started right away, so that the
   * sync never pushes a second copy of it.
   * @param account The user to create
   * @returns The created user, as stored on the server; fails with a {@link UserAccountError}
   */
  createAccount(account: NewUserAccount): Observable<UserData> {
    const token = this._authService.getAuthToken();
    const headers =
      token != null
        ? new HttpHeaders().set('Authorization', buildAuthorizationHeader(token))
        : new HttpHeaders();
    return this._apollo
      .mutate({
        mutation: CREATE_DINO_USER,
        variables: {
          email: account.email,
          password: account.password,
          fullName: account.full_name,
          groups: account.user_group_ids ?? [],
          locale: account.locale ?? null,
        },
        context: {headers},
        errorPolicy: 'all',
      })
      .pipe(
        map(res => {
          if (res.errors != null && res.errors.length > 0) {
            throw toUserAccountError(res.errors[0]);
          }
          const created = res.data?.create_dino_user?.[0];
          if (created == null) {
            throw new UserAccountError('unknown', 'create_dino_user returned no user');
          }
          this._dataService.runSync('user_data');
          return created;
        }),
        catchError(err =>
          throwError(() => (err instanceof UserAccountError ? err : toUserAccountError(err))),
        ),
      );
  }
}

/**
 * Maps a GraphQL or network error of create_dino_user to a {@link UserAccountError}. The
 * server function raises its errors as constraint violations, which Hasura passes on with
 * their message, so the message tells them apart.
 */
function toUserAccountError(err: any): UserAccountError {
  const message: string = err?.message ?? String(err);
  if (err?.networkError != null) {
    return new UserAccountError('offline', message);
  }
  if (message.includes('e-mail already in use')) {
    return new UserAccountError('email-in-use', message);
  }
  if (message.includes('only a Dino admin')) {
    return new UserAccountError('not-admin', message);
  }
  return new UserAccountError('unknown', message);
}
