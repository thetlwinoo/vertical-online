import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { HttpResponse, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { SERVER_API_URL } from '@vertical/constants';
import { Location } from '@angular/common';
import * as moment from 'moment';
import { ICustomerPaymentBankTransfer } from '@vertical/models';

type EntityResponseType = HttpResponse<any>;
type EntityArrayResponseType = HttpResponse<any[]>;

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  extendUrl: string = SERVER_API_URL + 'services/vscommerce/api/customer-payment-extend';
  constructor(private router: Router, private http: HttpClient, private location: Location) {}

  chargeCard(payload: any): Observable<EntityResponseType> {
    // const headers = new Headers({ 'token': token, 'amount': 1 });
    // console.log('headers',headers,token);
    console.log('before post', payload);
    return this.http.post<any>(
      this.extendUrl + '/stripe/charge',
      {
        token: payload.token,
        amount: payload.amount,
        orderId: payload.orderId,
        paymentMethodId: payload.paymentMethodId,
      },
      { observe: 'response' }
    );
  }

  cashOnDelivery(payload: any): Observable<EntityResponseType> {
    console.log('before post', payload);
    return this.http.post<any>(
      this.extendUrl + '/cash-on-delivery',
      {
        amount: payload.amount,
        orderId: payload.orderId,
        paymentMethodId: payload.paymentMethodId,
      },
      { observe: 'response' }
    );
  }

  bankTransfer(payload: any): Observable<EntityResponseType> {
    console.log('before post', payload);

    let params = new HttpParams();
    params = params.set('orderId', payload.orderId.toString());

    const copy = this.convertDateFromClient(payload.customerPaymentBankTransfer);

    return this.http.post<any>(this.extendUrl + '/bank-transfer', copy, { params, observe: 'response' });
  }

  createPayment(payload: any): Observable<EntityResponseType> {
    console.log('craetePay', payload);
    return this.http.post<any>(
      this.extendUrl + '/paypal/make/payment',
      {
        sum: payload.sum.toString(),
        returnUrl: `${payload.returnUrl}`,
        cancelUrl: `${payload.cancelUrl}`,
        orderId: payload.orderId,
        // returnUrl: `${SERVER_API_URL.replace(/\/$/, '')}${this.location.prepareExternalUrl(payload.returnUrl.toString())}`,
        // cancelUrl: `${SERVER_API_URL.replace(/\/$/, '')}${this.location.prepareExternalUrl(payload.returnUrl.toString())}`,
      },
      { observe: 'response' }
    );
  }

  completePayment(paymentId: string, payerId: string, orderId: number): Observable<EntityResponseType> {
    console.log('comple paypal service', paymentId, payerId, orderId);
    return this.http.post<any>(
      this.extendUrl + '/paypal/complete/payment',
      {
        paymentId,
        payerId,
        orderId,
      },
      { observe: 'response' }
    );
  }

  protected convertDateFromClient(customerPaymentBankTransfer: ICustomerPaymentBankTransfer): ICustomerPaymentBankTransfer {
    const copy: ICustomerPaymentBankTransfer = Object.assign({}, customerPaymentBankTransfer, {
      dateOfTransfer:
        customerPaymentBankTransfer.dateOfTransfer && customerPaymentBankTransfer.dateOfTransfer.isValid()
          ? customerPaymentBankTransfer.dateOfTransfer.toJSON()
          : undefined,
      lastEditedWhen:
        customerPaymentBankTransfer.lastEditedWhen && customerPaymentBankTransfer.lastEditedWhen.isValid()
          ? customerPaymentBankTransfer.lastEditedWhen.toJSON()
          : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateOfTransfer = res.body.dateOfTransfer ? moment(res.body.dateOfTransfer) : undefined;
      res.body.lastEditedWhen = res.body.lastEditedWhen ? moment(res.body.lastEditedWhen) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((customerPaymentBankTransfer: ICustomerPaymentBankTransfer) => {
        customerPaymentBankTransfer.dateOfTransfer = customerPaymentBankTransfer.dateOfTransfer
          ? moment(customerPaymentBankTransfer.dateOfTransfer)
          : undefined;
        customerPaymentBankTransfer.lastEditedWhen = customerPaymentBankTransfer.lastEditedWhen
          ? moment(customerPaymentBankTransfer.lastEditedWhen)
          : undefined;
      });
    }
    return res;
  }
}
