import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription, Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { IShoppingCarts, IAddresses, IOrders, IPeople, ICustomers, ChangeDeliveryMethodProps, ChangedAddToOrderProps } from '@eps/models';
import * as fromCheckout from 'app/ngrx/checkout/reducers';
import * as fromAuth from 'app/ngrx/auth/reducers';
import { AddressActions, OrderActions, CartActions } from 'app/ngrx/checkout/actions';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from '@eps/constants/input.constants';
import { OrderStatus } from '@eps/models';
import { Account } from '@eps/core/user/account.model';
import { AccountService } from '@eps/core';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
})
export class OrderFormComponent implements OnInit, OnDestroy {
  account: Account;
  cart$: Observable<IShoppingCarts>;
  cartPrice$: Observable<number>;
  itemCount$: Observable<number>;
  loading$: Observable<boolean>;
  addresses$: Observable<IAddresses[]>;
  addresses: IAddresses[];
  totalQuantity$: Observable<number>;
  selectedOrder$: Observable<IOrders>;
  people$: Observable<IPeople>;
  people: IPeople;
  customer$: Observable<ICustomers>;
  customer: ICustomers;
  placeOrderInd = false;
  private unsubscribe$: Subject<any> = new Subject();

  constructor(
    private store: Store<fromCheckout.State>,
    private router: Router,
    private accountService: AccountService,
    private authStore: Store<fromAuth.State>
  ) {
    this.cart$ = store.pipe(select(fromCheckout.getCartState)) as Observable<IShoppingCarts>;
    this.cartPrice$ = store.pipe(select(fromCheckout.getCartTotalPrice));
    this.itemCount$ = store.pipe(select(fromCheckout.getCartItemCount));
    this.totalQuantity$ = store.pipe(select(fromCheckout.getCartTotalQuantity));
    this.loading$ = store.pipe(select(fromCheckout.getCartLoading));
    this.addresses$ = store.pipe(select(fromCheckout.getAddressesFetched));
    this.people$ = authStore.pipe(select(fromAuth.getPeopleFetched));
    this.customer$ = authStore.pipe(select(fromAuth.getCustomerFetched));
    this.selectedOrder$ = store.pipe(select(fromCheckout.getSelectedOrder));
  }

  ngOnInit(): void {
    this.people$.pipe(takeUntil(this.unsubscribe$)).subscribe(item => {
      this.people = item;
      if (this.people) {
        this.store.dispatch(AddressActions.fetchAddresses({ query: { 'personId.equals': this.people.id } }));
      }
    });
    this.selectedOrder$.pipe(takeUntil(this.unsubscribe$)).subscribe(order => {
      if (order && order.totalDue > 0 && this.placeOrderInd) {
        this.router.navigate(['/checkout/payment', order.id, 'secure']);
      }
    });

    this.addresses$.pipe(takeUntil(this.unsubscribe$)).subscribe(addresses => {
      this.addresses = addresses;
    });

    this.accountService.identity().subscribe(account => {
      this.account = account;
    });
  }

  postOrder(defaultId: number): void {
    const today = moment().startOf('day');

    const postOrders: IOrders = {
      billToAddressId: defaultId,
      shipToAddressId: defaultId,
      orderDate: moment(today, DATE_TIME_FORMAT),
      lastEditedBy: this.account.id,
      lastEditedWhen: moment(),
      status: OrderStatus.NEW_ORDER,
    };
    this.store.dispatch(OrderActions.postOrder({ order: postOrders }));
    this.placeOrderInd = true;
  }

  onChangeDeliveryMethod(event: ChangeDeliveryMethodProps): void {
    this.store.dispatch(CartActions.changeDeliveryMethod({ props: event }));
  }

  onUpdateAddress(address: IAddresses): void {
    this.store.dispatch(AddressActions.updateAddress({ address, isShipping: true }));
  }

  onRemoveItem(props: ChangedAddToOrderProps): void {
    this.store.dispatch(CartActions.changedAddToOrder({ props }));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
