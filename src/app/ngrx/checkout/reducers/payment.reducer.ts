import { createReducer, on } from '@ngrx/store';

import { PaymentActions } from 'app/ngrx/checkout/actions';
import { IPaymentMethods } from '@eps/models';

export const paymentFeatureKey = 'payment';

export interface State {
  createPaypal: any;
  createPaypalLoading: boolean;
  completePaypal: any;
  completePaypalLoading: boolean;
  chargeStripe: any;
  chargeStripeLoading: boolean;
  cashOnDelivery: any;
  cashOnDeliveryLoading: boolean;
  bankTransfer: any;
  bankTransferLoading: boolean;
  paymentMethods: IPaymentMethods[];
  paymentMethodsLoading: boolean;
  error: string;
}

const initialState: State = {
  createPaypal: null,
  createPaypalLoading: false,
  completePaypal: null,
  completePaypalLoading: false,
  chargeStripe: null,
  chargeStripeLoading: false,
  cashOnDelivery: null,
  cashOnDeliveryLoading: false,
  bankTransfer: null,
  bankTransferLoading: false,
  paymentMethods: [],
  paymentMethodsLoading: false,
  error: '',
};

export const reducer = createReducer(
  initialState,
  on(PaymentActions.loadPaymentMethods, state => ({
    ...state,
    paymentMethodsLoading: true,
  })),
  on(PaymentActions.createPaypal, state => ({
    ...state,
    createPaypalLoading: true,
  })),
  on(PaymentActions.completePaypal, state => ({
    ...state,
    completePaypalLoading: true,
  })),
  on(PaymentActions.chargeStripe, state => ({
    ...state,
    chargeStripeLoading: true,
  })),
  on(PaymentActions.bankTransfer, state => ({
    ...state,
    bankTransferLoading: true,
  })),
  on(PaymentActions.cashOnDelivery, state => ({
    ...state,
    cashOnDeliveryLoading: true,
  })),
  on(PaymentActions.createPaypalSuccess, (state, { createPaypal }) => ({
    ...state,
    // createPaypalLoading: false,
    createPaypal,
    error: '',
  })),
  on(PaymentActions.completePaypalSuccess, (state, { completePaypal }) => ({
    ...state,
    createPaypalLoading: false,
    completePaypalLoading: false,
    completePaypal,
    error: '',
  })),
  on(PaymentActions.chargeStripeSuccess, (state, { chargeStripe }) => ({
    ...state,
    chargeStripeLoading: false,
    chargeStripe,
    error: '',
  })),
  on(PaymentActions.cashOnDeliverySuccess, (state, { cashOnDelivery }) => ({
    ...state,
    cashOnDeliveryLoading: false,
    cashOnDelivery,
    error: '',
  })),
  on(PaymentActions.bankTransferSuccess, (state, { bankTransfer }) => ({
    ...state,
    bankTransferLoading: false,
    bankTransfer,
    error: '',
  })),
  on(PaymentActions.loadPaymentMethodsSuccess, (state, { paymentMethods }) => ({
    ...state,
    paymentMethodsLoading: false,
    paymentMethods,
    error: '',
  })),
  on(PaymentActions.paymentError, (state, { errorMsg }) => ({
    ...state,
    createPaypalLoading: false,
    completePaypalLoading: false,
    chargeStripeLoading: false,
    bankTransferLoading: false,
    cashOnDeliveryLoading: false,
    paymentMethodsLoading: false,
    error: errorMsg,
  }))
);

export const getCreatePaypal = (state: State) => state.createPaypal;

export const getCreatePaypalLoading = (state: State) => state.createPaypalLoading;

export const getCompletePaypal = (state: State) => state.completePaypal;

export const getCompletePaypalLoading = (state: State) => state.completePaypalLoading;

export const getChargeStript = (state: State) => state.chargeStripe;

export const getChargeStriptLoading = (state: State) => state.chargeStripeLoading;

export const getCashOnDelivery = (state: State) => state.cashOnDelivery;

export const getCashOnDeliveryLoading = (state: State) => state.cashOnDeliveryLoading;

export const getBankTransfer = (state: State) => state.bankTransfer;

export const getBankTransferLoading = (state: State) => state.bankTransferLoading;

export const getPaymentMethods = (state: State) => state.paymentMethods;

export const getPaymentMethodsLoading = (state: State) => state.paymentMethodsLoading;

export const getError = (state: State) => state.error;
