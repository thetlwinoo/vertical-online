import { Injectable, NgZone } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';

import { map, switchMap } from 'rxjs/operators';
import * as PaymentActions from "./payment.actions";
import { of } from "rxjs";
import { PaypalService, CreditCardService } from "app/core/e-commerce/_services";

@Injectable()
export class PaymentEffects {
    @Effect()
    createPaypal = this.actions$.pipe(
        ofType(PaymentActions.CREATE_PAYPAL),
        map((action: PaymentActions.CreatePaypal) => {
            return action.payload
        }),
        switchMap((payload: { sum: number, returnUrl: string }) => {
            return this.paypalService.createPayment(payload)
                .map(res => {
                    console.log('paypal return', res, payload);
                    return { type: PaymentActions.CREATE_PAYPAL_SUCCESS, payload: { createPaypal: res, effect: PaymentActions.CREATE_PAYPAL } };
                })
                .catch(error => {
                    console.log('erroe', error);
                    return of(
                        new PaymentActions.PaymentError(
                            { error: error, errorEffect: PaymentActions.CREATE_PAYPAL }));
                })
        })
    )

    @Effect()
    completePaypal = this.actions$.pipe(
        ofType(PaymentActions.COMPLETE_PAYPAL),
        map((action: PaymentActions.CompletePaypal) => {
            return action.payload
        }),
        switchMap((payload: { paymentId: string, payerId: string, orderId: number }) => {
            console.log('to complete paypal', payload);
            return this.paypalService.completePayment(payload.paymentId, payload.payerId, payload.orderId)
                .map(res => {
                    console.log('complete paypal', res);
                    if (res.status == 'approved') {
                        this.ngZone.run(() => this.router.navigate(["/checkout/success", payload.orderId]).then());
                    }
                    return { type: PaymentActions.COMPLETE_PAYPAL_SUCCESS, payload: { completePaypal: res, effect: PaymentActions.COMPLETE_PAYPAL } }
                })
                .catch(error => {
                    console.log('complete error', error);
                    return of(
                        new PaymentActions.PaymentError(
                            { error: error, errorEffect: PaymentActions.COMPLETE_PAYPAL }));
                })
        })
    )

    @Effect()
    chargeStripe = this.actions$.pipe(
        ofType(PaymentActions.CHARGE_STRIPE),
        map((action: PaymentActions.ChargeStripe) => {
            return action.payload
        }),
        switchMap((payload: { token: string, amount: number, orderId: number }) => {
            console.log('charge palyload', payload)
            return this.creditCardService.chargeCard(payload)
                .map(res => {
                    console.log('charge stripe res', res);
                    if (res.status == 'succeeded') {
                        this.ngZone.run(() => this.router.navigate(["/checkout/success", payload.orderId]).then());
                    }
                    return { type: PaymentActions.CHARGE_STRIPE_SUCCESS, payload: { chargeStripe: res, effect: PaymentActions.CHARGE_STRIPE } }
                })
                .catch(error => {
                    console.log('charge error', error);
                    return of(
                        new PaymentActions.PaymentError(
                            { error: error, errorEffect: PaymentActions.CHARGE_STRIPE }));
                })
        })
    )


    constructor(
        private actions$: Actions,
        private paypalService: PaypalService,
        private creditCardService: CreditCardService,
        private router: Router,
        private ngZone: NgZone,
    ) {
    }
}
