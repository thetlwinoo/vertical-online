import { Action } from '@ngrx/store';
// import {Cart} from "./cart.reducer";
import { HttpError } from "../app.reducers";

export const CREATE_PAYPAL = 'CREATE_PAYPAL';
export const CREATE_PAYPAL_SUCCESS = 'CREATE_PAYPAL_SUCCESS';
export const COMPLETE_PAYPAL = 'COMPLETE_PAYPAL';
export const COMPLETE_PAYPAL_SUCCESS = 'COMPLETE_PAYPAL_SUCCESS';
export const CHARGE_STRIPE = 'CHARGE_STRIPE';
export const CHARGE_STRIPE_SUCCESS = 'CHARGE_STRIPE_SUCCESS';
export const PAYMENT_ERROR = 'PAYMENT_ERROR';

export class CreatePaypal implements Action {
    readonly type = CREATE_PAYPAL;

    constructor(public payload: { sum: number, returnUrl: string }) {
    }
}

export class CreatePaypalSuccess implements Action {
    readonly type = CREATE_PAYPAL_SUCCESS;

    constructor(public payload: { createPaypal: any, effect: string }) {
    }
}

export class CompletePaypal implements Action {
    readonly type = COMPLETE_PAYPAL;

    constructor(public payload: { paymentId: string, payerId: string, orderId:number }) {
    }
}

export class CompletePaypalSuccess implements Action {
    readonly type = COMPLETE_PAYPAL_SUCCESS;

    constructor(public payload: { completePaypal: any, effect: string }) {
    }
}

export class ChargeStripe implements Action {
    readonly type = CHARGE_STRIPE;

    constructor(public payload: { token: string, amount: number, orderId: number }) {
    }
}

export class ChargeStripeSuccess implements Action {
    readonly type = CHARGE_STRIPE_SUCCESS;

    constructor(public payload: { chargeStripe: any, effect: string }) {
    }
}

export class PaymentError implements Action {
    readonly type = PAYMENT_ERROR;

    constructor(public payload: HttpError) {
    }
}

export type PaymentActions =
    CreatePaypal
    | CreatePaypalSuccess
    | CompletePaypal
    | CompletePaypalSuccess
    | ChargeStripe
    | ChargeStripeSuccess;