import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { SERVER_API_URL } from '@epm/constants';
import { Observable } from 'rxjs';

type EntityResponseType = HttpResponse<any>;
type EntityArrayResponseType = HttpResponse<any[]>;

@Injectable()
export class PaypalService {

    extendUrl: string = SERVER_API_URL + 'api/paypal';

    constructor(private httpClient: HttpClient) {
    }

    createPayment(payload: any): Observable<EntityResponseType> {
        console.log('craetePay', payload)
        return this.httpClient.post<any>(this.extendUrl + '/make/payment', {
            sum: payload.sum.toString(),
            returnUrl: SERVER_API_URL + payload.returnUrl.toString(),
            cancelUrl: SERVER_API_URL + payload.returnUrl.toString()
        }, { observe: 'response' });
    }

    completePayment(paymentId: string, payerId: string, orderId: number): Observable<EntityResponseType> {
        console.log('comple paypal service', paymentId, payerId, orderId);
        return this.httpClient.post<any>(this.extendUrl + '/complete/payment', {
            paymentId: paymentId,
            payerId: payerId,
            orderId: orderId
        }, { observe: 'response' });
    }

}
