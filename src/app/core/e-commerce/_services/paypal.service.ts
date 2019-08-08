import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from '@app/env';
import { CompileShallowModuleMetadata } from '@angular/compiler';

@Injectable()
export class PaypalService {

    securedUrl: string = `${environment.serverApi.baseUrl}` + 'api/paypal';

    constructor(private httpClient: HttpClient) {
    }

    createPayment(payload: any) {
        // let params = new HttpParams();
        // params = params.set('sum', sum.toString());

        // console.log('Params', params);
        console.log('craetePay',payload)
        return this.httpClient.post<any>(this.securedUrl + '/make/payment', {
            sum: payload.sum.toString(),
            returnUrl: `${environment.client.baseUrl}` + payload.returnUrl.toString(),
            cancelUrl: `${environment.client.baseUrl}` + payload.returnUrl.toString()
        });
    }

    completePayment(paymentId: string, payerId: string, orderId: number) {
        // let params = new HttpParams();
        // params = params.set('paymentId', paymentId);
        // params = params.set('payerId', payerId);
        console.log('comple paypal service', paymentId, payerId, orderId);
        return this.httpClient.post<any>(this.securedUrl + '/complete/payment', {
            paymentId: paymentId,
            payerId: payerId,
            orderId: orderId
        });
    }

}
