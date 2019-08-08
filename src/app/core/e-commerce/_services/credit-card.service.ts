import { Injectable } from '@angular/core';
import { Product, CartItem, Orders } from '../_models';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { environment } from '@app/env';

@Injectable({
    providedIn: 'root'
})
export class CreditCardService {
    securedUrl: string = `${environment.serverApi.baseUrl}` + 'api/stripe';
    constructor(
        private router: Router,
        private http: HttpClient
    ) { }

    // chargeCard(token: string) {
    //     const headers = new Headers({ 'token': token, 'amount': 100 });
    //     this.http.post('http://localhost:8080/payment/charge', {}, { headers: headers })
    //         .subscribe(resp => {
    //             console.log(resp);
    //         });
    // }

    chargeCard(payload: any) {
        // const headers = new Headers({ 'token': token, 'amount': 1 });
        // console.log('headers',headers,token);
        console.log('before post',payload);
        return this.http.post<any>(this.securedUrl + '/charge', {
            token: payload.token,
            amount: payload.amount,
            orderId: payload.orderId
        });
    }
}
