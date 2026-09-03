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
  Input,
  isDevMode,
  OnDestroy,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {UntypedFormBuilder} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService, ExternalAuthProvider, LoginComponent, User} from '@dino/core/auth';
import {Observable, Subscription, of as obsOf} from 'rxjs';
import {map, switchMap, take, tap} from 'rxjs/operators';
import {TranslocoService} from '@ngneat/transloco';
import {NhostClient} from '@nhost/nhost-js';
import {OnlineUserDataManager, UserData} from '@dino/core/users';
import {ActionTrigger, ActionTriggerData, localDataOwners} from '@dino/core/data';

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
  nhost: NhostClient | null = null;
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
   * If true, users can signin with external authentication (Azure/Google).
   */
  readonly externalAuthAvailable: ExternalAuthProvider[] | undefined;

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

  /**
   * The warning about data left on this device, or null when there is none.
   *
   * A session the app gives up on - an authentication that could not be renewed,
   * a sync that kept failing - no longer deletes the local database, so the data
   * collected offline waits here for the account that collected it. Saying so
   * matters: the natural reaction to being unable to get back in is to try
   * another account, and that is now the one action that erases it.
   */
  readonly localDataWarning: Observable<string> | null = null;

  /**
   * Event emitted as an Action hook
   */
  @Output() readonly emitActionTrigger: EventEmitter<ActionTrigger<User | UserData>> =
    new EventEmitter<ActionTrigger<User | UserData>>();

  constructor(
    authService: AuthService,
    router: Router,
    fb: UntypedFormBuilder,
    cdr: ChangeDetectorRef,
    snackBar: MatSnackBar,
    ts: TranslocoService,
    private _oudm: OnlineUserDataManager,
    private _route: ActivatedRoute,
  ) {
    super(authService, router, fb, cdr, snackBar, ts);

    // Read from the owner record, not from the session: `super()` above runs
    // `resetAuth()`, so by now there is no user info and no auth config left.
    const dataOwners = localDataOwners();
    if (dataOwners.length > 0) {
      const account = dataOwners.map(owner => owner.label).find(label => label != null) ?? null;
      // Translated through the service, and not in the template, because the
      // message takes a parameter: `selectTranslate` also re-emits once the
      // translation files are loaded, which the constructor cannot wait for.
      this.localDataWarning =
        account != null
          ? ts.selectTranslate(
              'Data collected with the account {{account}} is still on this device. Log in with that account to synchronise it: logging in with a different one deletes it.',
              {account},
            )
          : ts.selectTranslate(
              'Data collected on this device has not been synchronised yet. Log in with the account that collected it: logging in with a different one deletes it.',
            );
    }

    this.signupAvailable = authService.authConfig.signUp;
    this.resetPassAvailable = authService.authConfig.resetPassword;
    this.externalAuthAvailable = authService.authConfig.externalAuthAvailable;

    if (this.externalAuthAvailable) {
      this.nhost = new NhostClient({
        authUrl: authService.authConfig.host,
        graphqlUrl: '_',
        storageUrl: '_',
        functionsUrl: '_',
      });
    }

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
              if (data['isExternalAuth'] && this.externalAuthAvailable && this.nhost != null) {
                snackBar.open(`Loading external authentication...`, 'AUTHENTICATION', {
                  duration: 3000,
                });
                this.nhost.auth.isAuthenticatedAsync().then(
                  _ => {
                    if (this.nhost != null) {
                      const session = this.nhost.auth.getSession();
                      const token = this.nhost.auth.getAccessToken();
                      const authUser = this.nhost.auth.getUser();
                      this.loginExternalUser(session, token, authUser, authService, router);
                    }
                  },
                  error => {
                    console.log('Promise rejected with ' + JSON.stringify(error));
                    snackBar.open(
                      `There was a problem during authentication process.`,
                      'AUTHENTICATION ERROR',
                      {
                        duration: 15000,
                      },
                    );
                  },
                );
              }
            }
          }),
        )
        .subscribe();
    }

    authService.loginEvt
      .pipe(
        switchMap(evt => {
          if (evt) {
            const trigData: ActionTriggerData<User> = {
              doc: authService.getUserInfo() as User,
            };
            const trigger: ActionTrigger<User> = {
              name: 'User Signin',
              triggerType: 'on_signin',
              triggerData: trigData,
            };
            this.emitActionTrigger.emit(trigger);
          }
          return obsOf(false);
        }),
        take(1),
      )
      .subscribe(() => {
        if (isDevMode()) {
          console.log('Successfully logged in');
        }
      });
  }

  /**
   * Login user with external authentication
   * @param session
   * @param token
   * @param authUser
   */
  loginExternalUser(
    session: any,
    token: string | undefined,
    authUser: any,
    authService: AuthService,
    router: Router,
  ) {
    if (authUser && session && token && session.user && session.user.email) {
      authService.storeAllAuthenticationInfo(
        session,
        token,
        undefined,
        authUser,
        this.externalAuthAvailable != undefined,
      );
      this._oudm
        .init()
        .pipe(
          switchMap(userDataMngInit => {
            if (userDataMngInit) {
              return this._oudm
                .query({
                  selector: {user_auth_ref_id: {$eq: session.user.id}, is_deleted: {$neq: true}},
                })
                .pipe(take(1));
            } else {
              return obsOf(null);
            }
          }),
          switchMap(ud => {
            if (ud == null || ud.length === 0) {
              const newUser = session.user;
              return this._oudm
                .create({
                  full_name: newUser.displayName,
                  email: newUser.email,
                  user_group_ids: [],
                  user_auth_ref_id: newUser.id,
                  created_at: new Date().toISOString(),
                })
                .pipe(
                  tap(usr => {
                    if (usr) {
                      const trigData: ActionTriggerData<UserData> = {doc: usr};
                      const trigger: ActionTrigger<UserData> = {
                        name: 'User Signup',
                        triggerType: 'on_signup',
                        triggerData: trigData,
                      };
                      this.emitActionTrigger.emit(trigger);
                    }
                  }),
                );
            } else {
              return obsOf(ud[0]);
            }
          }),
          take(1),
        )
        .subscribe(_ => {
          router.navigateByUrl('/', {replaceUrl: true});
        });
    }
  }

  ngOnDestroy() {
    this._expiredSub.unsubscribe();
  }
}
