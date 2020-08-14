import { createAction, props } from '@ngrx/store';

import {
  IOrders,
  CreatePaypalProps,
  CompletePaypalProps,
  StripeProps,
  CashOnDeliveryProps,
  IPaymentMethods,
  ICustomerPaymentBankTransfer,
  BankTransferProps,
} from '@vertical/models';

export const loadPaymentMethods = createAction('[Payment/API] Load Payment Methods');

export const loadPaymentMethodsSuccess = createAction(
  '[Payment/API] Load Payment Methods Success',
  props<{ paymentMethods: IPaymentMethods[] }>()
);

export const createPaypal = createAction('[Payment/API] Create Paypal', props<{ props: CreatePaypalProps }>());

export const createPaypalSuccess = createAction('[Payment/API] Create Paypal Success', props<{ createPaypal: any }>());

export const completePaypal = createAction('[Payment/API] Complete Paypal', props<{ props: CompletePaypalProps }>());

export const completePaypalSuccess = createAction('[Payment/API] Complete Paypal Success', props<{ completePaypal: any }>());

export const chargeStripe = createAction('[Payment/API] Charge Stripe', props<{ props: StripeProps }>());

export const chargeStripeSuccess = createAction('[Payment/API] Charge Stripe Success', props<{ chargeStripe: any }>());

export const cashOnDelivery = createAction('[Payment/API] Cash On Delivery', props<{ props: CashOnDeliveryProps }>());

export const cashOnDeliverySuccess = createAction('[Payment/API] Cash On Delivery Success', props<{ cashOnDelivery: any }>());

export const bankTransfer = createAction('[Payment/API] Bank Transfer', props<{ props: BankTransferProps }>());

export const bankTransferSuccess = createAction('[Payment/API] Bank Transfer Success', props<{ bankTransfer: any }>());

export const paymentError = createAction('[Payment/API] Payment Error', props<{ errorMsg: string }>());
