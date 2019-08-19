import { RootSharedModule } from '@root/shared.module';
import { NgModule } from '@angular/core';
import { CheckoutRoutingModule } from 'app/ngrx/checkout/checkout-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AddressEffects, CartEffects, OrderEffects, PaymentEffects } from 'app/ngrx/checkout/effects';
import * as fromCheckout from 'app/ngrx/checkout/reducers';

export const COMPONENTS = [

];

export const CONTAINERS = [

];

@NgModule({
    imports: [
        RootSharedModule,
        CheckoutRoutingModule,
        StoreModule.forFeature(fromCheckout.checkoutFeatureKey, fromCheckout.reducers),

        EffectsModule.forFeature([AddressEffects, CartEffects, OrderEffects, PaymentEffects])
    ],
    declarations: [COMPONENTS, CONTAINERS],
})
export class CheckoutModule { }