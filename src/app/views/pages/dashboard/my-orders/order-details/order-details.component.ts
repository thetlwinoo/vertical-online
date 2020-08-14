import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AddressesService } from '@vertical/services';
import { Orders, IOrders, IAddresses, IOrderLines, IProducts, IOrderTracking } from '@vertical/models';
import { filter, map, takeUntil } from 'rxjs/operators';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { select, Store } from '@ngrx/store';
import * as fromCheckout from 'app/ngrx/checkout/reducers';
import * as fromProducts from 'app/ngrx/products/reducers';
import { OrderTrackingActions, OrderActions, OrderLineActions } from 'app/ngrx/checkout/actions';
import { SERVER_API_URL } from '@vertical/constants';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit, OnDestroy {
  orders: Orders;
  // orderLines$: Observable<IOrderLines[]>;
  mostSelling$: Observable<IProducts[]>;
  mostSellingLoading$: Observable<boolean>;
  orderTracking$: Observable<IOrderTracking[]>;
  orderTrackLoading$: Observable<boolean>;
  shipToAddress: IAddresses;
  billToAddress: IAddresses;
  orderTracking: MenuItem[];
  activeOrderTrack = 0;

  public blobUrl = SERVER_API_URL + 'services/cloudblob/api/images-extend/';

  private unsubscribe$: Subject<any> = new Subject();

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected addressesService: AddressesService,
    private store: Store<fromCheckout.State>,
    private productStore: Store<fromProducts.State>
  ) {
    // this.orderLines$ = store.pipe(select(fromCheckout.getOrderLinesFetched));
    this.mostSelling$ = productStore.pipe(select(fromProducts.getFetchMostSelling));
    this.mostSellingLoading$ = productStore.pipe(select(fromProducts.getFetchMostSellingLoading));
    this.orderTracking$ = store.pipe(select(fromCheckout.getOrderTrackingFetched));
    this.orderTrackLoading$ = store.pipe(select(fromCheckout.getOrderTrackingLoading));
  }

  ngOnInit(): void {
    this.activatedRoute.data.pipe(takeUntil(this.unsubscribe$)).subscribe(({ orders }) => {
      this.orders = orders;
      console.log('order details', orders);
      this.store.dispatch(OrderTrackingActions.fetchOrderTracking({ query: { 'orderId.equals': this.orders.id } }));

      if (this.orders.shipToAddressId) {
        this.addressesService
          .find(this.orders.shipToAddressId)
          .pipe(
            filter((mayBeOk: HttpResponse<IAddresses>) => mayBeOk.ok),
            map((response: HttpResponse<IAddresses>) => response.body)
          )
          .subscribe(
            (res: IAddresses) => (this.shipToAddress = res),
            (res: HttpErrorResponse) => this.onError(res.message)
          );
      }

      if (this.orders.billToAddressId) {
        this.addressesService
          .find(this.orders.billToAddressId)
          .pipe(
            takeUntil(this.unsubscribe$),
            filter((res: HttpResponse<IAddresses>) => res.ok),
            map((res: HttpResponse<IAddresses>) => res.body)
          )
          .subscribe(
            (res: IAddresses) => (this.billToAddress = res),
            (res: HttpErrorResponse) => this.onError(res.message)
          );
      }

      switch (orders.status) {
        case 'NEW_ORDER':
          this.activeOrderTrack = 0;
          break;
        case 'PENDING':
          this.activeOrderTrack = 1;
          break;
        case 'SHIPPED':
          this.activeOrderTrack = 2;
          break;
        case 'DELIVERED':
          this.activeOrderTrack = 3;
          break;
      }

      console.log('orders.status', orders.status);
    });

    this.orderTracking = [{ label: 'Payment pending' }, { label: 'Processing' }, { label: 'Shipped' }, { label: 'Delivered' }];
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  protected onError(errorMessage: string): void {
    console.log('error', errorMessage);
  }
}
