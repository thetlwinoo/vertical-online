/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable id-blacklist */
import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription, Observable, Subject } from 'rxjs';
import { map, filter, takeUntil } from 'rxjs/operators';
import * as fromCheckout from 'app/ngrx/checkout/reducers';
import { Location } from '@angular/common';
import {
  IOrders,
  CreatePaypalProps,
  CompletePaypalProps,
  StripeProps,
  CashOnDeliveryProps,
  IPaymentMethods,
  BankTransferProps,
} from '@eps/models';
import { Store, select } from '@ngrx/store';
import { PaymentActions } from 'app/ngrx/checkout/actions';
import { StateStorageService } from '@eps/core';
import { SERVER_API_URL } from '@eps/constants';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PaymentFormComponent implements OnInit, OnDestroy {
  // paypalRedirectUrl$: Observable<string>;
  orders: IOrders;
  paymentMethods$: Observable<IPaymentMethods[]>;
  paymentMethods: IPaymentMethods[];

  createPaypal$: Observable<any>;
  createPaypalLoading$: Observable<boolean>;
  completePaypalLoading$: Observable<boolean>;
  paymentMethodsLoading$: Observable<boolean>;
  currentTabIndex;
  currentTab: IPaymentMethods;

  loading = false;
  data = [
    {
      bankName: 'AYA Bank',
      accountType: 'AYA Current Account',
      accountName: 'zezawar company limited',
      accountNo: '002-123456-7',
      bankLogo: 'assets/logo/bank/AYA.png',
    },
    {
      bankName: 'KBZ Bank',
      accountType: 'KBZ Current Account',
      accountName: 'zezawar company limited',
      accountNo: '006-654321-2',
      bankLogo: 'assets/logo/bank/KBZ.png',
    },
  ];

  // private subscriptions: Subscription[] = [];
  private unsubscribe$: Subject<any> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromCheckout.State>,
    private stateStorageService: StateStorageService,
    private location: Location
  ) {
    this.route.data.pipe(takeUntil(this.unsubscribe$)).subscribe(({ orders }) => {
      this.orders = orders;
    });

    this.route.queryParams
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(params => params.paymentId && params.PayerID),
        map(params =>
          PaymentActions.completePaypal({
            props: {
              paymentId: params.paymentId,
              payerId: params.PayerID,
              orderId: this.orders.id,
              paymentMethodId: this.orders.paymentMethodId,
            },
          })
        )
      )
      .subscribe(action => store.dispatch(action));

    this.createPaypal$ = store.pipe(select(fromCheckout.getPaymentCreatePaypal));

    this.createPaypalLoading$ = store.pipe(select(fromCheckout.getCreatePaypalLoading));

    this.completePaypalLoading$ = store.pipe(select(fromCheckout.getCompletePaypalLoading));

    this.paymentMethods$ = store.pipe(select(fromCheckout.getPaymentMethods));

    this.paymentMethodsLoading$ = store.pipe(select(fromCheckout.getPaymentMethodsLoading));
  }

  ngOnInit(): void {
    const stateIndex = this.stateStorageService.getPaymentMethod();
    console.log('stateProps', stateIndex);
    if (stateIndex) {
      this.currentTabIndex = stateIndex;
    }

    this.store.dispatch(PaymentActions.loadPaymentMethods());

    this.paymentMethods$.pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
      if (res.length > 0) {
        this.paymentMethods = res;
        this.currentTab = res[0];

        // const props = { index: this.currentTabIndex, paymentMethod: this.currentTab };

        if (!this.currentTabIndex) {
          this.currentTabIndex = 0;
          this.stateStorageService.storePaymentMethod(0);
        } else {
          this.currentTab = this.paymentMethods[this.currentTabIndex];
        }
      }
    });

    this.createPaypalLoading$.subscribe(res => console.log('loading', res));
  }

  onPaypalCheckout(): void {
    const createPaypalProps: CreatePaypalProps = {
      sum: this.orders.totalDue,
      returnUrl: encodeURI(location.href),
      cancelUrl: encodeURI(`${location.origin}${this.location.prepareExternalUrl('checlout/unscucess/' + this.orders.id)}`),
      orderId: this.orders.id,
    };

    this.store.dispatch(PaymentActions.createPaypal({ props: createPaypalProps }));
  }

  onChargeCard(event): void {
    // (window as any).Stripe.card.createToken(
    //   {
    //     number: event.cardNumber,
    //     exp_month: event.cardExpiryMonth,
    //     exp_year: event.cardExpiryYear,
    //     cvc: event.cardCVV,
    //   },
    //   (status: number, response: any) => {
    //     if (status === 200) {
    //       const stripeProps: StripeProps = {
    //         token: response.id,
    //         amount: event.totalDue,
    //         orderId: event.orderId,
    //         paymentMethodId: this.currentTab.id,
    //       };

    //       this.store.dispatch(PaymentActions.chargeStripe({ props: stripeProps }));
    //     } else {
    //       console.log(response.error.message);
    //     }
    //   }
    // );
    const stripeProps: StripeProps = {
      token: event.id,
      amount: this.orders.totalDue,
      orderId: this.orders.id,
      paymentMethodId: this.currentTab.id,
    };

    this.store.dispatch(PaymentActions.chargeStripe({ props: stripeProps }));
  }

  onCashOnDelivery(event): void {
    const cashOnDeliveryProps: CashOnDeliveryProps = {
      amount: event.totalDue,
      orderId: event.id,
      paymentMethodId: this.currentTab.id,
    };

    this.store.dispatch(PaymentActions.cashOnDelivery({ props: cashOnDeliveryProps }));
  }

  onBankTransfer(event): void {
    const props: BankTransferProps = {
      orderId: this.orders.id,
      customerPaymentBankTransfer: event,
    };

    console.log('bank transfer', props);
    this.store.dispatch(PaymentActions.bankTransfer({ props }));
  }

  selectedTabIndexChanged(index): void {
    console.log('index', index);
    this.currentTabIndex = index;
    this.stateStorageService.storePaymentMethod(index);
  }

  selectedTabChanged(event): void {
    this.currentTab = event;
    // const props = { index: this.currentTabIndex, paymentMethod: this.currentTab };
    // console.log(props);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
