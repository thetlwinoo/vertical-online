export interface CreatePaypalProps {
    sum: number;
    returnUrl: string;
}

export interface CompletePaypalProps {
    paymentId: string;
    payerId: string;
    orderId: number;
}

export interface StripeProps {
    token: string;
    amount: number;
    orderId: number;
}