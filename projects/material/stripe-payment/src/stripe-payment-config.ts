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

import {InjectionToken} from '@angular/core';

/**
 * Stripe Payment module configuration
 */
export interface StripePaymentConfig {
  /**
   * The Stripe key
   */
  stripeKey: string;
  /**
   * The Gnupay service base url
   */
  gnuPayUrl: string;
  /**
   * The Pandino Token stripe product ID
   */
  pandinoTokenID: string;
  /**
   * The Custom loading spinner image path
   */
  spinnerImagePath?: string;
  /**
   * Url to be redirected to once the payment has succeeded
   */
  return_url?: string;
}

export const STRIPE_PAYMENT_CONFIG = new InjectionToken<StripePaymentConfig>(
  'dino-stripe-payment-config',
);
