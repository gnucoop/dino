import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';
import {DataChatModule as DinoDataChatModule} from '@dino/material/datachat';
import {CheckoutRoutingModule} from './checkout-e2e-routing.module';
import {StripePaymentModule as DinoStripePaymentModule} from '@dino/material/stripe-payment';
import {CheckoutE2E} from './checkout-e2e.component';

@NgModule({
  declarations: [CheckoutE2E],
  imports: [
    CommonModule,
    DinoBreadcrumbsModule,
    DinoDataChatModule,
    DinoStripePaymentModule,
    CheckoutRoutingModule,
  ],
})
export class MaterialCheckoutE2eModule {}
