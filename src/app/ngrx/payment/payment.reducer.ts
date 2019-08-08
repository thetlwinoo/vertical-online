import * as PaymentActions from './payment.actions';
import { HttpError } from "../app.reducers";

export interface State {
    createPaypal: any;
    completePaypal: any;
    chargeStripe: any;
    errors: HttpError[];
    loading: boolean;
}

const initialState: State = {
    createPaypal: null,
    completePaypal: null,
    chargeStripe: null,
    errors: [],
    loading: false
};

export function paymentReducer(state = initialState, action: PaymentActions.PaymentActions) {
    switch (action.type) {
        case (PaymentActions.CREATE_PAYPAL):
        case (PaymentActions.COMPLETE_PAYPAL):
        case (PaymentActions.CHARGE_STRIPE):
            return {
                ...state,
                loading: true
            };

        case (PaymentActions.CREATE_PAYPAL_SUCCESS):
            let createPaypalErrorClear = state.errors;
            for (let i = 0; i < createPaypalErrorClear.length; i++) {
                if (createPaypalErrorClear[i].errorEffect === action.payload.effect) {
                    createPaypalErrorClear = createPaypalErrorClear.splice(i, 1);
                }
            }
            if (action.payload.createPaypal == null || action.payload.createPaypal == undefined) {
                return {
                    ...state,
                    createPaypal: null,
                    createPaypalOrderId: null,
                    errors: createPaypalErrorClear,
                    loading: false
                }
            }

            console.log('crate paypal reducer ',action.payload);
            return {
                ...state,
                createPaypal: action.payload.createPaypal,
                errors: createPaypalErrorClear,
                loading: false
            };

        case (PaymentActions.COMPLETE_PAYPAL_SUCCESS):
            let completePaypalErrorClear = state.errors;
            for (let i = 0; i < completePaypalErrorClear.length; i++) {
                if (completePaypalErrorClear[i].errorEffect === action.payload.effect) {
                    completePaypalErrorClear = completePaypalErrorClear.splice(i, 1);
                }
            }
            if (action.payload.completePaypal == null || action.payload.completePaypal == undefined) {
                return {
                    ...state,
                    completePaypal: null,
                    errors: completePaypalErrorClear,
                    loading: false
                }
            }
            return {
                ...state,
                completePaypal: action.payload.completePaypal,
                errors: completePaypalErrorClear,
                loading: false
            };

        case (PaymentActions.CHARGE_STRIPE_SUCCESS):
            let chargeStripeErrorClear = state.errors;
            for (let i = 0; i < chargeStripeErrorClear.length; i++) {
                if (chargeStripeErrorClear[i].errorEffect === action.payload.effect) {
                    chargeStripeErrorClear = chargeStripeErrorClear.splice(i, 1);
                }
            }
            if (action.payload.chargeStripe == null || action.payload.chargeStripe == undefined) {
                return {
                    ...state,
                    chargeStripe: null,
                    errors: chargeStripeErrorClear,
                    loading: false
                }
            }
            return {
                ...state,
                chargeStripe: action.payload.chargeStripe,
                errors: chargeStripeErrorClear,
                loading: false
            };

        default:
            return state;
    }
}