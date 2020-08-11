import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from '@eps/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MyOrdersComponent } from './my-orders.component';
import { OrderService } from '@eps/services';
import { Orders, IOrders } from '@eps/models';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { JhiResolvePagingParams } from 'ng-jhipster';

@Injectable({ providedIn: 'root' })
export class MyOrdersResolve implements Resolve<Orders> {
  constructor(private service: OrderService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Orders> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.getOrder(id).pipe(
        filter((res: HttpResponse<Orders>) => res.ok),
        map((res: HttpResponse<Orders>) => {
          res.body.orderDetails = JSON.parse(res.body.orderDetails);
          return res.body;
        })
      );
    }
    return of(new Orders());
  }
}

export const myOrdersRoute: Routes = [
  {
    path: '',
    component: MyOrdersComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams,
    },
    data: {
      authorities: ['ROLE_CUSTOMER'],
      pageTitle: 'My Orders',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: OrderDetailsComponent,
    resolve: {
      orders: MyOrdersResolve,
    },
    data: {
      authorities: ['ROLE_CUSTOMER'],
      pageTitle: 'Order Details',
    },
    canActivate: [UserRouteAccessService],
  },
];
