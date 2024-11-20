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

import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import {TranslocoModule} from '@ngneat/transloco';

import {StripeCheckout} from './stripe-checkout';
import {MatDialogModule} from '@angular/material/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {AjfTranslocoModule} from '@ajf/core/transloco';
import {LoadingSpinnerModule as DinoLoadingSpinnerModule} from '@dino/material/loading-spinner';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {STRIPE_PAYMENT_CONFIG, StripePaymentConfig} from './stripe-payment-config';
import {StripeCheckoutLanding} from './stripe-checkout-landing';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  imports: [
    AjfTranslocoModule,
    CommonModule,
    DinoLoadingSpinnerModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    TranslocoModule,
  ],
  declarations: [StripeCheckout, StripeCheckoutLanding],
  exports: [StripeCheckout, StripeCheckoutLanding],
})
export class StripePaymentModule {
  static forRoot(config: StripePaymentConfig): ModuleWithProviders<StripePaymentModule> {
    return {
      ngModule: StripePaymentModule,
      providers: [{provide: STRIPE_PAYMENT_CONFIG, useValue: config}],
    };
  }
}
