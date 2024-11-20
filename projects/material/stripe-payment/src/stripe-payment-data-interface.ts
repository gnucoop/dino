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

/**
 * The Payment mode used by Stripe
 */
export type StripePayMode = 'stripe-payment' | 'stripe-checkout';

/**
 * Represents Payment Info sent to the Node Pay service endpoint.
 */
export interface PaymentInfo {
  /**
   * The amount to be payed expressed in Euro Cents
   */
  amount?: number;
  /**
   * The Payment "title"
   */
  name?: string;
  /**
   * The quantity of products to purchase
   */
  quantity?: number;
  /**
   * The Buyer's email addeess
   */
  email?: string;
}

/**
 * Represents data for a Stripe Payment or Purchase
 */
export interface StripePaymentData {
  /**
   * The Payment mode (payment dialog or Stripe checkout page)
   */
  mode: StripePayMode;
  /**
   * The PaymentInfo object
   */
  info: PaymentInfo;
}

/**
 * Represents the Status info object for a Stripe Checkout Session handled by GnuPay
 */
export interface StripeSessionStatus {
  /**
   * The session current status
   */
  status?: 'open' | 'complete' | 'expired';
  /**
   * The session metadata
   */
  metadata?: {email: string; product_id: string; product_name: string; quantity: number};
  /**
   * The session total amount paid (in cents)
   */
  total?: number;
  /**
   * The customer's email address
   */
  customer_email?: string;
  /**
   * The session fetching error
   */
  error?: string;
}

/**
 * Represents a response object from the "/getusertokens" endpoint
 */
export interface GetUserTokensResponse {
  /**
   * Response error message
   */
  error?: string;
  /**
   * The response with the tokens number
   */
  response?: {tokens: number};
}

/**
 * Represents a response object from the "/checkpandinouser" endpoint
 */
export interface CheckPandinoUserResponse {
  /**
   * Response error message
   */
  error?: string;
  /**
   * The response with the Pandino user info
   */
  response?: {user: {user_email: string; api_key: string; expiration_date: Date}};
}
