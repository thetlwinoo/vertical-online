import { Injectable } from '@angular/core';
import { Product, CartItem, Orders } from '@root/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { SERVER_API_URL } from '@root/constants';

type EntityResponseType = HttpResponse<any>;
type EntityArrayResponseType = HttpResponse<any[]>;

@Injectable({
    providedIn: 'root'
})
export class CreditCardService {
    extendUrl: string = SERVER_API_URL + 'api/stripe';
    constructor(
        private router: Router,
        private http: HttpClient
    ) { }

    chargeCard(payload: any): Observable<EntityResponseType> {
        // const headers = new Headers({ 'token': token, 'amount': 1 });
        // console.log('headers',headers,token);
        console.log('before post', payload);
        return this.http.post<any>(this.extendUrl + '/charge', {
            token: payload.token,
            amount: payload.amount,
            orderId: payload.orderId
        }, { observe: 'response' });
    }
}
