import { Moment } from 'moment';
import { IOrderLines } from './order-lines.model';

export interface IOrders {
    id?: number;
    orderDate?: Moment;
    dueDate?: Moment;
    shipDate?: Moment;
    paymentStatus?: number;
    orderFlag?: number;
    orderNumber?: string;
    subTotal?: number;
    taxAmount?: number;
    frieight?: number;
    totalDue?: number;
    comments?: string;
    deliveryInstructions?: string;
    internalComments?: string;
    pickingCompletedWhen?: Moment;
    orderReviewId?: number;
    orderReview?: any;
    orderLineLists?: IOrderLines[];
    customerId?: number;
    shipToAddressId?: number;
    shipToAddress?:any;
    billToAddressId?: number;
    billToAddress?:any;
    shipMethodShipMethodName?: string;
    shipMethodId?: number;
    currencyRateId?: number;
    paymentId?: number;
    specialDealsId?: number;
}

export class Orders implements IOrders {
    constructor(
        public id?: number,
        public orderDate?: Moment,
        public dueDate?: Moment,
        public shipDate?: Moment,
        public paymentStatus?: number,
        public orderFlag?: number,
        public orderNumber?: string,
        public subTotal?: number,
        public taxAmount?: number,
        public frieight?: number,
        public totalDue?: number,
        public comments?: string,
        public deliveryInstructions?: string,
        public internalComments?: string,
        public pickingCompletedWhen?: Moment,
        public orderReviewId?: number,
        public orderReview?: any,
        public orderLineLists?: IOrderLines[],
        public customerId?: number,
        public shipToAddressId?: number,
        public shipToAddress?:any,
        public billToAddressId?: number,
        public billToAddress?:any,
        public shipMethodShipMethodName?: string,
        public shipMethodId?: number,
        public currencyRateId?: number,
        public paymentId?: number,
        public specialDealsId?: number
    ) { }
}
