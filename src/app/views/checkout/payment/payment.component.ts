import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import * as fromApp from "app/ngrx/app.reducers";
import { Store } from "@ngrx/store";
import * as OrderActions from "app/ngrx/order/order.actions";
import * as PaymentActions from "app/ngrx/payment/payment.actions";
import { Router, ActivatedRoute, Params, NavigationEnd } from "@angular/router";
import { MenuItem } from 'primeng/api';
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import 'rxjs/add/operator/take';
import { HttpError } from "app/ngrx/app.reducers";
import { Orders } from 'app/core/e-commerce/_models';
import { filter, take } from 'rxjs/operators';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, OnDestroy {
  paymentState: Observable<{ createPaypal: any, errors: HttpError[], loading: boolean }>;

  activatedRouteSubscription: Subscription;
  paymentSubscription: Subscription;
  querySubscribe: Subscription;
  orders: any;
  paypalRedirectUrl: string = null;
  createPaypalOrderId: string = null;

  constructor(
    private store: Store<fromApp.AppState>,
    // private router: Router,
    protected activatedRoute: ActivatedRoute,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.paymentState = this.store.select('payment');

    this.activatedRouteSubscription = this.activatedRoute.data.subscribe(({ orders }) => {
      this.orders = orders;
    });    

    this.paymentSubscription = this.paymentState.subscribe(data => {
      console.log('paymentSubscription', data)
      if (data.createPaypal && data.createPaypal.status == 'success') {
        console.log('create success', data)
        this.paypalRedirectUrl = data.createPaypal.redirect_url;
      }
    }); 

    this.querySubscribe = this.route.queryParams.subscribe((params: Params) => {      
      if (params['paymentId'] && params['PayerID']) {
        this.store.dispatch(new PaymentActions.CompletePaypal({
          paymentId: params['paymentId'],
          payerId: params['PayerID'],
          orderId: this.orders.id,
        }));
      } 
    });
  }

  ngOnDestroy() {
    if (this.activatedRouteSubscription) this.activatedRouteSubscription.unsubscribe();
    // if (this.paymentSubscription) this.paymentSubscription.unsubscribe();
    if (this.querySubscribe) this.querySubscribe.unsubscribe();
  }

  onPaypalCheckout(event) {
    let payload = {
      // sum: this.totalDue
      sum: this.orders.totalDue,
      returnUrl: this.router.url
    };
    // console.log('on paypal', payload);
    this.store.dispatch(new PaymentActions.CreatePaypal(payload));
  }

  onChargeCard(event) {
    // let form = document.getElementsByTagName("form")[0];
    (<any>window).Stripe.card.createToken({
      number: event.cardNumber,
      exp_month: event.cardExpiryMonth,
      exp_year: event.cardExpiryYear,
      cvc: event.cardCVV
    }, (status: number, response: any) => {
      if (status === 200) {
        let payload = {
          token: response.id,
          amount: this.orders.totalDue,
          orderId: this.orders.id
        };
        this.store.dispatch(new PaymentActions.ChargeStripe(payload));

      } else {
        console.log(response.error.message);
      }
    });
  }
}
