import { createAction, props } from '@ngrx/store';

import { IOrders } from '@root/models';

interface PaypalProps {
    paymentId: string;
    payerId: string;
    orderId: number;
}

interface StripeProps {
    token: string;
    amount: number;
    orderId: number;
}

export const createPaypal = createAction(
    '[Payment/API] Create Paypal',
    props<{ props: PaypalProps }>()
);

export const createPaypalSuccess = createAction(
    '[Payment/API] Create Paypal Success',
    props<{ createPaypal: any }>()
);

export const completePaypal = createAction(
    '[Payment/API] Complete Paypal',
    props<{ props: PaypalProps }>()
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
