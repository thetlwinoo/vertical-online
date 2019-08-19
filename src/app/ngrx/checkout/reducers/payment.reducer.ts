import { createReducer, on } from '@ngrx/store';

import {
    PaymentActions
} from 'app/ngrx/checkout/actions';

export const paymentFeatureKey = 'payment';

export interface State {
    loaded: boolean;
    loading: boolean;
    createPaypal: any;
    completePaypal: any;
    chargeStripe: any;
    error: string;
}

const initialState: State = {
    loaded: false,
    loading: false,
    createPaypal: null,
    completePaypal: null,
    chargeStripe: null,
    error: ''
};

export const reducer = createReducer(
    initialState,
    on(
        PaymentActions.createPaypal,
        PaymentActions.completePaypal,
        PaymentActions.chargeStripe,
        state => ({
            ...state,
            loading: true,
        })),
    on(
        PaymentActions.createPaypalSuccess,
        (state, { createPaypal }) => ({
            ...state,
            loaded: true,
            loading: false,
            createPaypal: createPaypal,
            error: ''
        })
    ),
    on(
        PaymentActions.completePaypalSuccess,
        (state, { completePaypal }) => ({
            ...state,
            loaded: true,
            loading: false,
            completePaypal: completePaypal,
            error: ''
        })
    ),
    on(
        PaymentActions.chargeStripeSuccess,
        (state, { chargeStripe }) => ({
            ...state,
            loaded: true,
            loading: false,
            chargeStripe: chargeStripe,
            error: ''
        })
    ),
    on(PaymentActions.paymentError, (state, { errorMsg }) => ({
        ...state,
        loading: false,
        error: errorMsg
    }))

)

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getCreatePaypal = (state: State) => state.createPaypal;

export const getCompletePaypal = (state: State) => state.completePaypal;

export const getChargeStript = (state: State) => state.chargeStripe;

export const getError = (state: State) => state.error;