import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import * as fromCheckout from 'app/ngrx/checkout/reducers';
import { IOrders, CreatePaypalProps, CompletePaypalProps, StripeProps } from '@root/models';
import { Store, select } from '@ngrx/store';
import { PaymentActions } from 'app/ngrx/checkout/actions';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent implements OnDestroy {
  private subscriptions: Subscription[] = [];
  paypalRedirectUrl$: Observable<string>;
  orders: IOrders;
  // private subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromCheckout.State>
  ) {
    const activatedRouteSubscription = this.route.data.subscribe(({ orders }) => {
      this.orders = orders;
    });
    this.subscriptions.push(activatedRouteSubscription);

    const actionsSubscription = this.route.queryParams
      .pipe(
        filter(params => params['paymentId'] && params['PayerID']),
        map(params =>
          PaymentActions.completePaypal({
            props: {
              paymentId: params['paymentId'],
              payerId: params['PayerID'],
              orderId: this.orders.id,
            }
          }))
      )
      .subscribe(action => store.dispatch(action));

    this.subscriptions.push(actionsSubscription);

    this.paypalRedirectUrl$ = store.pipe(select(fromCheckout.getPaymentPaypalRedirectUrl)) as Observable<string>;
  }

  onPaypalCheckout() {
    const createPaypalProps: CreatePaypalProps = {
      sum: this.orders.totalDue,
      returnUrl: this.router.url
    };

    this.store.dispatch(PaymentActions.createPaypal({ props: createPaypalProps }));
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

        const stripeProps: StripeProps = {
          token: response.id,
          amount: event.totalDue,
          orderId: event.orderId
        };

        this.store.dispatch(PaymentActions.chargeStripe({ props: stripeProps }));
      } else {
        console.log(response.error.message);
      }
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(el => {
      if (el) el.unsubscribe();
    });
  }

}
