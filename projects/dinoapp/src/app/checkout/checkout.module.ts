import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BreadcrumbsModule as DinoBreadcrumbsModule} from '@dino/material/breadcrumbs';
import {DataChatModule as DinoDataChatModule} from '@dino/material/datachat';
import {CheckoutRoutingModule} from './checkout-routing.module';
import {StripePaymentModule as DinoStripePaymentModule} from '@dino/material/stripe-payment';
import {CheckoutComponent} from './components/checkout.component';

@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    CommonModule,
    DinoBreadcrumbsModule,
    DinoDataChatModule,
    DinoStripePaymentModule,
    CheckoutRoutingModule,
  ],
})
export class CheckoutModule {}
