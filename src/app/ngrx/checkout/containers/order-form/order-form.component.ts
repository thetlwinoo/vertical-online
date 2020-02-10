import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { IShoppingCarts, IAddresses, IOrders } from '@eps/models';
import * as fromCheckout from 'app/ngrx/checkout/reducers';
import { AddressActions, OrderActions } from 'app/ngrx/checkout/actions';
import * as moment from 'moment';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit, OnDestroy {
  cart$: Observable<IShoppingCarts>;
  cartPrice$: Observable<number>;
  defaultAddress$: Observable<IAddresses>;
  addresses$: Observable<IAddresses[]>;
  totalQuantity$: Observable<number>;
  currentOrder$: Observable<IOrders>;
  placeOrderInd: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private store: Store<fromCheckout.State>,
    private router: Router
  ) {
    this.cart$ = store.pipe(select(fromCheckout.getCartState)) as Observable<IShoppingCarts>;
    this.cartPrice$ = store.pipe(select(fromCheckout.getCartTotalPrice)) as Observable<number>;
    this.defaultAddress$ = store.pipe(select(fromCheckout.getAddressDefault)) as Observable<IAddresses>;
    this.addresses$ = store.pipe(select(fromCheckout.getAddressesFetched)) as Observable<IAddresses[]>;
    this.totalQuantity$ = store.pipe(select(fromCheckout.getCartTotalQuantity)) as Observable<number>;
    this.currentOrder$ = store.pipe(select(fromCheckout.getOrderCurrent)) as Observable<IOrders>;
  }

  ngOnInit() {
    this.store.dispatch(AddressActions.fetchAddresses());
    const currentOrderSucscription = this.currentOrder$.subscribe(order => {
      if (order && order.totalDue > 0 && this.placeOrderInd) {
        this.router.navigate(['/checkout/payment', order.id, 'secure'])
      }
    });
    this.subscriptions.push(currentOrderSucscription);
  }

  postOrder(defaultId: number) {
    const postOrders: IOrders = {
      billToAddressId: defaultId,
      shipToAddressId: defaultId,
      orderDate: moment(),
      shipDate: moment(),
      dueDate: moment()
    };
    // console.log('POST ORDERS', postOrders);
    this.store.dispatch(OrderActions.postOrder({ order: postOrders }));
    this.placeOrderInd = true;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(el => {
      if (el) el.unsubscribe();
    });
  }
}
