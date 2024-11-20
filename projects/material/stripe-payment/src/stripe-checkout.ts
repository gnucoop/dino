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

import {HttpClient} from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  isDevMode,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Stripe, StripeEmbeddedCheckout, loadStripe} from '@stripe/stripe-js';
import {BehaviorSubject, Observable, Subscription, combineLatest, from, of as obsOf} from 'rxjs';
import {catchError, switchMap, take} from 'rxjs/operators';
import {StripePaymentData} from './stripe-payment-data-interface';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslocoService} from '@ajf/core/transloco';
import {STRIPE_PAYMENT_CONFIG, StripePaymentConfig} from './stripe-payment-config';
/**
 * The Stripe checkout component.
 * Displays the Stripe embedded checkout form in a Material Dialog.
 */
@Component({
  selector: 'dino-stripe-checkout',
  styleUrls: ['stripe-checkout.scss'],
  templateUrl: 'stripe-checkout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class StripeCheckout implements OnDestroy {
  /**
   * The Stripe SDK instance.
   */
  stripe: Observable<Stripe | null>;
  /**
   * The Stripe checkout session element to be mounted/unmounted
   */
  checkoutElement: BehaviorSubject<StripeEmbeddedCheckout | null> =
    new BehaviorSubject<StripeEmbeddedCheckout | null>(null);
  /**
   * Http request for a Checkout
   */
  checkoutRequest: Observable<any>;
  checkoutSub: Subscription = Subscription.EMPTY;

  constructor(
    @Inject(STRIPE_PAYMENT_CONFIG) readonly config: StripePaymentConfig,
    @Inject(MAT_DIALOG_DATA) readonly data: StripePaymentData,
    public dialogRef: MatDialogRef<StripeCheckout>,
    private _snackbar: MatSnackBar,
    private _trs: TranslocoService,
    private _httpClient: HttpClient,
  ) {
    this.stripe = this.config.stripeKey ? from(loadStripe(this.config.stripeKey)) : obsOf(null);

    const checkoutUrl = `${this.config.gnuPayUrl}/create-checkout-session`;

    this.checkoutRequest = this._httpClient
      .post<any>(checkoutUrl, {...this.data.info, product_id: this.config.pandinoTokenID})
      .pipe(
        catchError(err => {
          if (isDevMode()) {
            console.log(err);
          }
          this._snackbar.open(
            this._trs.translate('Could not connect with Payment service or Stripe'),
            'OOPS!',
            {
              duration: 10000,
            },
          );
          this.closeDialog();
          return obsOf(null);
        }),
        take(1),
      );

    if (this.data.mode === 'stripe-checkout') {
      this.checkoutSub = combineLatest([this.stripe, this.checkoutRequest])
        .pipe(
          switchMap(([stripe, res]) => {
            if (!res || !res.clientSecret || !stripe) return obsOf(null);
            const clientSecret = res.clientSecret;
            return from(
              stripe.initEmbeddedCheckout({
                clientSecret,
              }),
            );
          }),
          take(1),
        )
        .subscribe(checkout => {
          if (!checkout) return;
          this.checkoutElement.next(checkout);
          if (this.checkoutElement.value) this.checkoutElement.value.mount('#checkout');
        });
    }
  }

  /**
   * Closes the Checkout dialog
   */
  closeDialog(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    if (this.checkoutElement && this.checkoutElement.value) {
      this.checkoutElement.value.destroy();
    }
    this.checkoutSub.unsubscribe();
  }
}
