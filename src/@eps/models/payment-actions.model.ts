import { ICustomerPaymentBankTransfer } from './customer-payment-bank-transfer.model';
import { IPaymentMethods } from '.';

export interface CreatePaypalProps {
  sum: number;
  returnUrl: string;
  cancelUrl: string;
  orderId: number;
}

export interface CompletePaypalProps {
  paymentId: string;
  payerId: string;
  orderId: number;
  paymentMethodId: number;
}

export interface StripeProps {
  token: string;
  amount: number;
  orderId: number;
  paymentMethodId: number;
}

export interface CashOnDeliveryProps {
  amount: number;
  orderId: number;
  paymentMethodId: number;
}

export interface BankTransferProps {
  orderId: number;
  customerPaymentBankTransfer: ICustomerPaymentBankTransfer;
}

export interface PaymentMethodTabProps {
  index: number;
  paymentMethod: IPaymentMethods;
}
