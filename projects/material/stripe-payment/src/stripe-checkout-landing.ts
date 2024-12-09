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
  Component,
  Inject,
  Optional,
  ViewEncapsulation,
} from '@angular/core';
import {STRIPE_PAYMENT_CONFIG, StripePaymentConfig} from './stripe-payment-config';
import {TranslocoService} from '@ajf/core/transloco';
import {ActivatedRoute} from '@angular/router';
import {StripeSessionStatus} from './stripe-payment-data-interface';
import {Observable} from 'rxjs';
import {TokensService} from './tokens.service';

/**
 * The Stripe Checkout Landing component.
 * Offers a landing page for completed (successfully or not) Stripe checkout sessions.
 */
@Component({
  selector: 'dino-stripe-checkout-landing',
  styleUrls: ['stripe-checkout-landing.scss'],
  templateUrl: 'stripe-checkout-landing.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class StripeCheckoutLanding {
  /**
   * The checkout session status object
   */
  sessionStatus: Observable<StripeSessionStatus | null>;
  /**
   * The remaining amount of user Pandino Tokens
   */
  availableTokens: Observable<number | null>;

  constructor(
    @Optional() @Inject(STRIPE_PAYMENT_CONFIG) readonly config: StripePaymentConfig | null,
    private _trs: TranslocoService,
    private _route: ActivatedRoute,
    private _tokensService: TokensService,
  ) {
    const session_id = this._route.snapshot.params['session_id'];
    this.sessionStatus = this._tokensService.getCheckoutSessionStatus(session_id);
    this.availableTokens = this._tokensService.availableTokens;
  }

  /**
   * Converts cents to euros
   * @param total The total amount in cents
   * @returns amount in Euros
   */
  parseTotal(total: number | undefined) {
    if (!total) return 0;
    const euros = (total / 100).toLocaleString('it-IT', {style: 'currency', currency: 'EUR'});
    return euros;
  }
}
