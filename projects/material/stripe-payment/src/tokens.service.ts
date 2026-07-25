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

import {EventEmitter, Inject, Injectable, isDevMode, Optional} from '@angular/core';
import {STRIPE_PAYMENT_CONFIG, StripePaymentConfig} from './stripe-payment-config';
import {HttpClient} from '@angular/common/http';
import {
  BuyPandinoReportResponse,
  CheckPandinoUserResponse,
  GetUserTokensResponse,
  StripePaymentData,
  StripePayMode,
  StripeSessionStatus,
} from './stripe-payment-data-interface';
import {
  DATA_SERVICE,
  DATA_SERVICE_CONFIG,
  DataServiceConfig,
  IDataService,
  PANDINO_SERVICE_CONFIG,
  PandinoConfig,
} from '@dino/core/data';
import {AuthService} from '@dino/core/auth';
import {MatDialog} from '@angular/material/dialog';
import {StripeCheckout} from './stripe-checkout';
import {combineLatest, Observable, of as obsOf, startWith} from 'rxjs';
import {catchError, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';
import {AjfReportVariable} from '@ajf/core/reports';

/**
 * Service that manages Pandino Tokens and Stripe Operations
 */
@Injectable({providedIn: 'root'})
export class TokensService {
  /**
   * Event emitted when the Pandino tokens amount is updated
   */
  readonly refreshPandinoTokensEvt: EventEmitter<void> = new EventEmitter<void>();
  /**
   * The Amount of Pandino Tokens available to the user.
   * Displayed only if a valid API Key is found in localstorage.
   */
  readonly availableTokens: Observable<number | null>;

  constructor(
    @Optional() @Inject(STRIPE_PAYMENT_CONFIG) private _stripeConfig: StripePaymentConfig | null,
    @Inject(DATA_SERVICE_CONFIG) private _dataConfig: DataServiceConfig,
    @Inject(PANDINO_SERVICE_CONFIG) private _pandinoConfig: PandinoConfig,
    private _http: HttpClient,
    private _authService: AuthService,
    // Must be the ACTIVE data service: with the concrete offline DataService,
    // `firstReplicationComplete` never emits in online mode (no collections are
    // registered on it), so the Pandino bootstrap below never ran.
    @Inject(DATA_SERVICE) private _dataService: IDataService,
    private _dialog: MatDialog,
  ) {
    // Bootstrap the Pandino user (and therefore the API key) once the user is
    // authenticated and data is queryable.
    //
    // This deliberately does NOT require the current auth event to be exactly
    // 'login'. `combineLatest` reports the *latest* value of each source, and
    // readiness arrives after the login event — by then the auth event has often
    // moved on (a token refresh emits 'refresh successful', the auth guard emits
    // 'init refresh'), which silently skipped the bootstrap. A page reload never
    // emits 'login' at all, so it never ran there either.
    //
    // Instead: fire whenever we are authenticated with a token and ready, keyed
    // by the user so it runs once per user per session and again if a different
    // user logs in.
    combineLatest([
      this._authService.authToken,
      this._authService.authenticated,
      // Readiness, not replication: online mode never replicates, so gating on
      // `firstReplicationComplete` meant this bootstrap never ran there.
      this._dataService.dataReady,
    ])
      .pipe(
        map(([authToken, authEvt, ready]) =>
          authToken != null && authEvt.auth === true && ready
            ? this._authService.getUserInfo()?.email ?? authToken
            : null,
        ),
        distinctUntilChanged(),
        switchMap(userKey =>
          userKey == null
            ? obsOf(null)
            : // Never let a failed request kill this subscription: it is created
              // once per session, so an error here would disable the Pandino
              // bootstrap until a full page reload.
              this.checkPandinoUser().pipe(
                catchError(err => {
                  if (isDevMode()) {
                    console.error('[TokensService] checkPandinoUser failed', err);
                  }
                  return obsOf(null);
                }),
              ),
        ),
      )
      .subscribe(pandinoUserResponse => {
        if (!pandinoUserResponse) return;
        if (pandinoUserResponse.error && isDevMode()) {
          console.log(pandinoUserResponse);
          return;
        }
        if (pandinoUserResponse.response) {
          const apiKey = pandinoUserResponse.response.user.api_key;
          localStorage.setItem('pandas_dino_api_key', apiKey);
          this.refreshPandinoTokensEvt.emit();
        }
      });

    this.availableTokens = this.refreshPandinoTokensEvt.pipe(
      startWith(true),
      switchMap(() =>
        combineLatest([
          // Without this, a single failed /getusertokens request errors the whole
          // stream. Because of the shareReplay below that error is then replayed
          // to every subscriber, so the credits badge stays hidden until the page
          // is reloaded.
          this.getUserPandinoTokens().pipe(
            catchError(err => {
              if (isDevMode()) {
                console.error('[TokensService] getUserPandinoTokens failed', err);
              }
              return obsOf(null);
            }),
          ),
          this._authService.authenticated,
        ]),
      ),
      map(([userTokensResp, auth]) => {
        const storedApiKey = localStorage.getItem('pandas_dino_api_key');
        if (
          !userTokensResp ||
          !userTokensResp.response ||
          userTokensResp.response.tokens === null ||
          !auth.auth ||
          !storedApiKey
        )
          return null;
        return userTokensResp.response.tokens;
      }),
      shareReplay(1),
    );
  }

  /**
   * Opens a Stripe Payment dialog
   * @param mode the Payment mode (checkout or free amount payment)
   * @param quantity the quantity of products (tokens) to purchase
   */
  openPayment(mode: StripePayMode, quantity: number): void {
    const userInfo = this._authService.getUserInfo();
    if (userInfo == null || userInfo.email == null) {
      return;
    }
    const paymentData: StripePaymentData = {
      mode,
      info: {
        quantity,
        email: userInfo.email,
      },
    };
    this._dialog.open(StripeCheckout, {data: paymentData});
  }

  /**
   * Retrieves the amount of available tokens for the current user from Pandino API
   * @returns the number of tokens
   */
  getUserPandinoTokens(): Observable<GetUserTokensResponse | null> {
    if (!this._pandinoConfig) return obsOf(null);
    const storedApiKey = localStorage.getItem('pandas_dino_api_key');
    const userInfo = this._authService.getUserInfo();
    if (storedApiKey && userInfo && userInfo.email) {
      const headers = {'X-API-KEY': storedApiKey, 'X-USER-EMAIL': userInfo.email};
      return this._http.post<GetUserTokensResponse | null>(
        `${this._pandinoConfig.pandinoUrl}/getusertokens`,
        null,
        {headers},
      );
    } else {
      if (isDevMode()) {
        console.log('No DINO-AI API key found');
      }
      return obsOf(null);
    }
  }

  /**
   * Call to Pandino to buy an AIPrompt report and authorize its creation.
   */
  buyPandinoAIPromptReport(
    prompts: AjfReportVariable[],
  ): Observable<BuyPandinoReportResponse | null> {
    if (!this._pandinoConfig || !prompts || !prompts.length) return obsOf(null);
    const storedApiKey = localStorage.getItem('pandas_dino_api_key');
    const userInfo = this._authService.getUserInfo();
    if (storedApiKey && userInfo && userInfo.email) {
      const headers = {'X-API-KEY': storedApiKey, 'X-USER-EMAIL': userInfo.email};
      return this._http.post<BuyPandinoReportResponse | null>(
        `${this._pandinoConfig.pandinoUrl}/buyreport`,
        {'prompts': prompts.length},
        {headers},
      );
    } else {
      if (isDevMode()) {
        console.log('No DINO-AI API key found');
      }
      return obsOf(null);
    }
  }

  /**
   * Attempts to add an authenticated User to the Pandino database.
   * Pandino will generate and provide an API key for the user.
   * If the user already exists, returns their username and apiKey
   * @returns The Pandino User Response
   */
  checkPandinoUser(): Observable<CheckPandinoUserResponse | null> {
    if (!this._pandinoConfig) return obsOf(null);
    const userInfo = this._authService.getUserInfo();
    const authToken = this._authService.authToken.value;
    const graphqlUrl = this._dataConfig.syncOptions.url.http;
    if (userInfo && userInfo.email && authToken) {
      const headers = {
        'X-USER-EMAIL': userInfo.email,
        'X-AUTH-TOKEN': authToken,
        'X-GRAPHQL-URL': graphqlUrl,
      };
      return this._http.post<CheckPandinoUserResponse | null>(
        `${this._pandinoConfig.pandinoUrl}/checkpandinouser`,
        null,
        {
          headers,
        },
      );
    } else {
      if (isDevMode()) {
        console.log('No Active user found');
      }
      return obsOf(null);
    }
  }

  /**
   * Retrieves the status of a Stripe checkout session
   * @param session_id The session id
   * @returns the status object
   */
  getCheckoutSessionStatus(session_id: string): Observable<StripeSessionStatus | null> {
    if (!session_id || !this._stripeConfig) return obsOf(null);
    const getSessionStatusUrl = `${this._stripeConfig.gnuPayUrl}/get-session-status`;
    return this._http.post<StripeSessionStatus>(getSessionStatusUrl, {session_id});
  }
}
