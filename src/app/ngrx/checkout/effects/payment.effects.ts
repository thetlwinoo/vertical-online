import { Injectable, NgZone } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, filter, mergeMap, tap } from 'rxjs/operators';
import { PaymentActions, CartActions } from '../actions';
import { PaymentService, PaymentMethodsService } from '@eps/services';
import { Router } from '@angular/router';
import { IPaymentMethods } from '@eps/models';

@Injectable()
export class PaymentEffects {
  createPaypal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentActions.createPaypal),
      mergeMap(({ props }) =>
        this.paymentService.createPayment(props).pipe(
          filter((res: HttpResponse<any>) => res.ok),
          map((res: HttpResponse<any>) => PaymentActions.createPaypalSuccess({ createPaypal: res.body })),
          tap(payload => {
            if (payload.createPaypal.status === 'success') {
              window.location.href = payload.createPaypal.redirect_url;
            } else {
              this.ngZone.run(() => this.router.navigate(['/checkout/unsuccess', props.orderId]).then());
            }
          }),
          catchError(err => of(PaymentActions.paymentError({ errorMsg: err.message })))
        )
      )
    )
  );

  completePaypal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentActions.completePaypal),
      mergeMap(({ props }) =>
        this.paymentService.completePayment(props.paymentId, props.payerId, props.orderId).pipe(
          filter((res: HttpResponse<any>) => res.ok),
          map((res: HttpResponse<any>) => PaymentActions.completePaypalSuccess({ completePaypal: res.body })),
          tap(payload => {
            if (payload.completePaypal.status === 'approved') {
              this.ngZone.run(() => this.router.navigate(['/checkout/success', props.orderId]).then());
            } else {
              this.ngZone.run(() => this.router.navigate(['/checkout/unsuccess', props.orderId]).then());
            }
          }),
          catchError(err => {
            this.ngZone.run(() => this.router.navigate(['/checkout/unsuccess', props.orderId]).then());
            return of(PaymentActions.paymentError({ errorMsg: err.message }));
          })
        )
      )
    )
  );

  chargeStripe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentActions.chargeStripe),
      mergeMap(({ props }) =>
        this.paymentService.chargeCard(props).pipe(
          filter((res: HttpResponse<any>) => res.ok),
          map((res: HttpResponse<any>) => PaymentActions.chargeStripeSuccess({ chargeStripe: res.body })),
          tap(payload => {
            if (payload.chargeStripe.status === 'succeeded') {
              this.ngZone.run(() => this.router.navigate(['/checkout/success', props.orderId]).then());
            } else {
              this.ngZone.run(() => this.router.navigate(['/checkout/unsuccess', props.orderId]).then());
            }
          }),
          catchError(err => {
            this.ngZone.run(() => this.router.navigate(['/checkout/unsuccess', props.orderId]).then());
            return of(PaymentActions.paymentError({ errorMsg: err.message }));
          })
        )
      )
    )
  );

  cashOnDelivery$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentActions.cashOnDelivery),
      mergeMap(({ props }) =>
        this.paymentService.cashOnDelivery(props).pipe(
          filter((res: HttpResponse<any>) => res.ok),
          map((res: HttpResponse<any>) => PaymentActions.cashOnDeliverySuccess({ cashOnDelivery: res.body })),
          tap(payload => {
            if (payload.cashOnDelivery.status === 'succeeded') {
              console.log('cash on delviery success', props);
              this.ngZone.run(() => this.router.navigate(['/checkout/success', props.orderId]).then());
            } else {
              this.ngZone.run(() => this.router.navigate(['/checkout/unsuccess', props.orderId]).then());
            }
          }),
          catchError(err => {
            this.ngZone.run(() => this.router.navigate(['/checkout/unsuccess', props.orderId]).then());
            return of(PaymentActions.paymentError({ errorMsg: err.message }));
          })
        )
      )
    )
  );

  bankTransfer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentActions.bankTransfer),
      mergeMap(({ props }) =>
        this.paymentService.bankTransfer(props).pipe(
          filter((res: HttpResponse<any>) => res.ok),
          map((res: HttpResponse<any>) => PaymentActions.bankTransferSuccess({ bankTransfer: res.body })),
          tap(payload => {
            if (payload.bankTransfer.status === 'succeeded') {
              console.log('bank transfer success', props);
              this.ngZone.run(() => this.router.navigate(['/checkout/success', props.orderId]).then());
            } else {
              this.ngZone.run(() => this.router.navigate(['/checkout/unsuccess', props.orderId]).then());
            }
          }),
          catchError(err => {
            this.ngZone.run(() => this.router.navigate(['/checkout/unsuccess', props.orderId]).then());
            return of(PaymentActions.paymentError({ errorMsg: err.message }));
          })
        )
      )
    )
  );

  loadPaymentMethods$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentActions.loadPaymentMethods),
      switchMap(() =>
        this.paymentMethodsService.query().pipe(
          filter((res: HttpResponse<IPaymentMethods[]>) => res.ok),
          map((res: HttpResponse<IPaymentMethods[]>) => PaymentActions.loadPaymentMethodsSuccess({ paymentMethods: res.body })),
          catchError(err => of(PaymentActions.paymentError({ errorMsg: err.message })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private paymentService: PaymentService,
    private paymentMethodsService: PaymentMethodsService,
    private router: Router,
    private ngZone: NgZone
  ) {}
}
