import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AddressesService } from '@eps/services';
import { Orders, IOrders, IAddresses } from '@eps/models';
import { filter, map } from 'rxjs/operators';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit, OnDestroy {
  activatedRouteSubscription: Subscription;
  orders: Orders;
  shipToAddresses: IAddresses;

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected addressesService: AddressesService
  ) { }

  ngOnInit() {
    this.activatedRouteSubscription = this.activatedRoute.data.subscribe(({ orders }) => {
      this.orders = orders;
      console.log('order details', orders)

      if (this.orders.shipToAddressId) {
        this.addressesService.find(this.orders.shipToAddressId)
          .pipe(
            filter((mayBeOk: HttpResponse<IAddresses>) => mayBeOk.ok),
            map((response: HttpResponse<IAddresses>) => response.body)
          )
          .subscribe(
            (res: IAddresses) => {
              this.shipToAddresses = res;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
          );
      }
    });
  }

  protected onError(errorMessage: string) {
    console.log('error', errorMessage);
  }

  ngOnDestroy() {
    if (this.activatedRouteSubscription) {
      this.activatedRouteSubscription.unsubscribe();
    }
  }
}
