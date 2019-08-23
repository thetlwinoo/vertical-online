import { RootSharedModule } from '@root/shared.module';
import { NgModule } from '@angular/core';
import { CheckoutRoutingModule } from 'app/ngrx/checkout/checkout-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AddressEffects, CartEffects, OrderEffects, PaymentEffects } from 'app/ngrx/checkout/effects';
import * as fromCheckout from 'app/ngrx/checkout/reducers';

import { ShoppingCartComponent } from './containers/shopping-cart/shopping-cart.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { EmptyCartComponent } from './components/empty-cart/empty-cart.component';
import { InterestedProductComponent } from './components/interested-product/interested-product.component';
import { OrderFormComponent } from './containers/order-form/order-form.component';
import { AddressListComponent } from './components/address-list/address-list.component';
import { NewAddressComponent } from './components/new-address/new-address.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { PaymentFormComponent } from './containers/payment-form/payment-form.component';
import { SuccessFormComponent } from './containers/success-form/success-form.component';
import { CreditCardComponent } from './components/credit-card/credit-card.component';

export const COMPONENTS = [
    CartDetailsComponent,
    EmptyCartComponent,
    InterestedProductComponent,
    AddressListComponent,
    NewAddressComponent,
    OrderDetailsComponent
];

export const CONTAINERS = [
    ShoppingCartComponent,
    OrderFormComponent
];

@NgModule({
    imports: [
        RootSharedModule,
        CheckoutRoutingModule,
        StoreModule.forFeature(fromCheckout.checkoutFeatureKey, fromCheckout.reducers),

        EffectsModule.forFeature([AddressEffects, CartEffects, OrderEffects, PaymentEffects])
    ],
    declarations: [COMPONENTS, CONTAINERS, PaymentFormComponent, SuccessFormComponent, CreditCardComponent],
})
export class CheckoutModule { }