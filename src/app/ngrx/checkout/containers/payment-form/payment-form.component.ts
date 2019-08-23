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
export class PaymentFormComponent {
  orders$: Observable<IOrders>;
  actionsSubscription: Subscription;
  orderId: number;
  // private subscriptions: Subscription[] = [];

  constructor(
    route: ActivatedRoute,
    private router: Router,
    private store: Store<fromCheckout.State>
  ) {
    this.orders$ = store.pipe(select(fromCheckout.getOrderCurrent)) as Observable<IOrders>;

    this.actionsSubscription = route.queryParams
      .pipe(
        filter(params => params['paymentId'] && params['PayerID']),
        map(params =>
          PaymentActions.completePaypal({
            props: {
              paymentId: params['paymentId'],
              payerId: params['PayerID'],
              orderId: this.orderId,
            }
          }))
      )
      .subscribe(action => store.dispatch(action));
  }

  onPaypalCheckout() {
    this.orders$.subscribe(order => {
      this.orderId = order.id;
      const createPaypalProps: CreatePaypalProps = {
        sum: order.totalDue,
        returnUrl: this.router.url
      };

      this.store.dispatch(PaymentActions.createPaypal({ props: createPaypalProps }));
    });
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

}
