import { Injectable, NgZone } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, filter, mergeMap, tap } from 'rxjs/operators';
import { PaymentActions } from '../actions';
import { PaypalService, CreditCardService } from '@root/services';
import { Router } from '@angular/router';

@Injectable()
export class PaymentEffects {
    createPaypal$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PaymentActions.createPaypal),
            mergeMap(({ props }) =>
                this.paypalService.createPayment(props).pipe(
                    filter((res: HttpResponse<any>) => res.ok),
                    map((res: HttpResponse<any>) =>
                        PaymentActions.createPaypalSuccess({ createPaypal: res.body })
                    ),
                    catchError(err =>
                        of(PaymentActions.paymentError({ errorMsg: err.message }))
                    )
                )
            )
        )
    );

    completePaypal$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PaymentActions.completePaypal),
            mergeMap(({ props }) =>
                this.paypalService.completePayment(props.paymentId, props.payerId, props.orderId).pipe(
                    filter((res: HttpResponse<any>) => res.ok),
                    map((res: HttpResponse<any>) =>
                        PaymentActions.completePaypalSuccess({ completePaypal: res.body })
                    ),
                    tap(payload => {
                        if (payload.completePaypal.status == 'approved') {
                            this.ngZone.run(() => this.router.navigate(["/checkout/success", props.orderId]).then());
                        }
                    }),
                    catchError(err =>
                        of(PaymentActions.paymentError({ errorMsg: err.message }))
                    )
                )
            )
        )
    );

    chargeStripe$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PaymentActions.chargeStripe),
            mergeMap(({ props }) =>
                this.creditCardService.chargeCard(props).pipe(
                    filter((res: HttpResponse<any>) => res.ok),
                    map((res: HttpResponse<any>) => PaymentActions.chargeStripeSuccess({ chargeStripe: res.body })),
                    tap(payload => {
                        if (payload.chargeStripe.status == 'succeeded') {
                            console.log('pros charg',props)
                            this.ngZone.run(() => this.router.navigate(["/checkout/success", props.orderId]).then());
                        }
                    }),
                    catchError(err =>
                        of(PaymentActions.paymentError({ errorMsg: err.message }))
                    )
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private paypalService: PaypalService,
        private creditCardService: CreditCardService,
        private router: Router,
        private ngZone: NgZone,
    ) {
    }
}