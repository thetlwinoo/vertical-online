import { RootSharedModule } from '@eps/shared.module';
import { PartialsModule } from 'app/views/partials/partials.module';
import { NgModule } from '@angular/core';
import { CheckoutRoutingModule } from 'app/ngrx/checkout/checkout-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import {
  AddressEffects,
  AddressTypeEffects,
  CartEffects,
  OrderEffects,
  PaymentEffects,
  OrderTrackingEffects,
} from 'app/ngrx/checkout/effects';
import * as fromCheckout from 'app/ngrx/checkout/reducers';

import { ShoppingCartComponent } from './containers/shopping-cart/shopping-cart.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { EmptyCartComponent } from './components/empty-cart/empty-cart.component';
import { InterestedProductComponent } from './components/interested-product/interested-product.component';
import { OrderFormComponent } from './containers/order-form/order-form.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { PaymentFormComponent } from './containers/payment-form/payment-form.component';
import { SuccessFormComponent } from './containers/success-form/success-form.component';
import { UnSuccessFormComponent } from './containers/unsuccess-form/unsuccess-form.component';
import { CreditCardComponent } from './components/credit-card/credit-card.component';
import { BankTransferComponent } from './components/bank-transfer/bank-transfer.component';

import { CartService, PaymentService, PeopleService } from '@eps/services';

export const COMPONENTS = [
  CartDetailsComponent,
  EmptyCartComponent,
  InterestedProductComponent,
  OrderDetailsComponent,
  CreditCardComponent,
  BankTransferComponent,
  UnSuccessFormComponent,
];

export const CONTAINERS = [ShoppingCartComponent, OrderFormComponent, PaymentFormComponent, SuccessFormComponent, UnSuccessFormComponent];

@NgModule({
  imports: [
    RootSharedModule,
    PartialsModule,
    CheckoutRoutingModule,
    StoreModule.forFeature(fromCheckout.checkoutFeatureKey, fromCheckout.reducers),

    EffectsModule.forFeature([AddressEffects, AddressTypeEffects, CartEffects, OrderEffects, PaymentEffects, OrderTrackingEffects]),
  ],
  declarations: [COMPONENTS, CONTAINERS],
  providers: [CartService, PaymentService, PeopleService],
})
export class CheckoutModule {}
