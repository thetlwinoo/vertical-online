import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { SERVER_API_URL } from '@root/constants';
import { CompileShallowModuleMetadata } from '@angular/compiler';

@Injectable()
export class PaypalService {

    extendUrl: string = SERVER_API_URL + 'api/paypal';

    constructor(private httpClient: HttpClient) {
    }

    createPayment(payload: any) {
        // let params = new HttpParams();
        // params = params.set('sum', sum.toString());

        // console.log('Params', params);
        console.log('craetePay',payload)
        return this.httpClient.post<any>(this.extendUrl + '/make/payment', {
            sum: payload.sum.toString(),
            returnUrl: SERVER_API_URL + payload.returnUrl.toString(),
            cancelUrl: SERVER_API_URL + payload.returnUrl.toString()
        });
    }

    completePayment(paymentId: string, payerId: string, orderId: number) {
        // let params = new HttpParams();
        // params = params.set('paymentId', paymentId);
        // params = params.set('payerId', payerId);
        console.log('comple paypal service', paymentId, payerId, orderId);
        return this.httpClient.post<any>(this.extendUrl + '/complete/payment', {
            paymentId: paymentId,
            payerId: payerId,
            orderId: orderId
        });
    }

}