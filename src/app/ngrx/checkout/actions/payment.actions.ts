import { createAction, props } from '@ngrx/store';

import { IOrders, CreatePaypalProps, CompletePaypalProps, StripeProps } from '@epm/models';

export const createPaypal = createAction(
    '[Payment/API] Create Paypal',
    props<{ props: CreatePaypalProps }>()
);

export const createPaypalSuccess = createAction(
    '[Payment/API] Create Paypal Success',
    props<{ createPaypal: any }>()
);

export const completePaypal = createAction(
    '[Payment/API] Complete Paypal',
    props<{ props: CompletePaypalProps }>()
);

export const completePaypalSuccess = createAction(
    '[Payment/API] Complete Paypal Success',
    props<{ completePaypal: any }>()
);

export const chargeStripe = createAction(
    '[Payment/API] Charge Stripe',
    props<{ props: StripeProps }>()
);

export const chargeStripeSuccess = createAction(
    '[Payment/API] Charge Stripe Success',
    props<{ chargeStripe: any }>()
);

export const paymentError = createAction(
    '[Payment/API] Payment Error',
    props<{ errorMsg: string }>()
);
