import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AddressesService } from '@eps/services';
import { Orders, IOrders, IAddresses, IOrderLines, IProducts } from '@eps/models';
import { filter, map } from 'rxjs/operators';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { select, Store } from '@ngrx/store';
import * as fromCheckout from 'app/ngrx/checkout/reducers';
import * as fromProducts from 'app/ngrx/products/reducers';
import { OrderActions, OrderLineActions } from 'app/ngrx/checkout/actions';
import { SERVER_API_URL } from '@eps/constants';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit, OnDestroy {
  activatedRouteSubscription: Subscription;
  orders: Orders;
  // orderLines$: Observable<IOrderLines[]>;
  mostSelling$: Observable<IProducts[]>;
  mostSellingLoading$: Observable<boolean>;
  shipToAddress: IAddresses;
  billToAddress: IAddresses;

  public blobUrl = SERVER_API_URL + 'services/cloudblob/api/images-extend/';

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected addressesService: AddressesService,
    private store: Store<fromCheckout.State>,
    private productStore: Store<fromProducts.State>
  ) {
    // this.orderLines$ = store.pipe(select(fromCheckout.getOrderLinesFetched));
    this.mostSelling$ = productStore.pipe(select(fromProducts.getFetchMostSelling));
    this.mostSellingLoading$ = productStore.pipe(select(fromProducts.getFetchMostSellingLoading));
  }

  ngOnInit(): void {
    this.activatedRouteSubscription = this.activatedRoute.data.subscribe(({ orders }) => {
      this.orders = orders;
      console.log('order details', orders);
      // this.store.dispatch(OrderLineActions.fetchOrderLines({ orderId: this.orders.id }));

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
            filter((res: HttpResponse<IAddresses>) => res.ok),
            map((res: HttpResponse<IAddresses>) => res.body)
          )
          .subscribe(
            (res: IAddresses) => (this.billToAddress = res),
            (res: HttpErrorResponse) => this.onError(res.message)
          );
      }
    });
  }

  ngOnDestroy(): void {
    if (this.activatedRouteSubscription) {
      this.activatedRouteSubscription.unsubscribe();
    }
  }

  protected onError(errorMessage: string): void {
    console.log('error', errorMessage);
  }
}
