import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { PaymentObject, BusinessEntityObject } from "app/ngrx/order/order.reducer";
import { Orders } from 'app/core/e-commerce/_models';
import { Subscription } from "rxjs/Subscription";
import { Router, ActivatedRoute, Params, NavigationEnd } from "@angular/router";

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit, OnDestroy {
  // orderState: Observable<{ postOrders: Orders, postPayment: PaymentObject }>;
  orders: Orders;
  activatedRouteSubscription: Subscription;
  // public orderDetails: Order = {};
  public opened = false;
  activeIds: any[] = [];
  constructor(
    // private store: Store<fromApp.AppState>,
    protected activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.activatedRouteSubscription = this.activatedRoute.data.subscribe(({ orders }) => {
      this.orders = orders;
      console.log('Success Orders', this.orders)
    });
  }

  ngOnDestroy() {
    if (this.activatedRouteSubscription) this.activatedRouteSubscription.unsubscribe();
  }
}
