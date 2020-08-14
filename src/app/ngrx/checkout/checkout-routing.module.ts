import { NgModule, Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, RouterModule } from '@angular/router';
import { UserRouteAccessService } from '@vertical/core';
import { ShoppingCartComponent } from './containers/shopping-cart/shopping-cart.component';
import { OrderFormComponent } from './containers/order-form/order-form.component';
import { PaymentFormComponent } from './containers/payment-form/payment-form.component';
import { SuccessFormComponent } from './containers/success-form/success-form.component';
import { UnSuccessFormComponent } from './containers/unsuccess-form/unsuccess-form.component';
import { IOrders, Orders } from '@vertical/models';
import { OrderService } from '@vertical/services';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import * as fromCheckout from 'app/ngrx/checkout/reducers';
import { select, Store } from '@ngrx/store';
import { OrderActions } from './actions';

@Injectable({ providedIn: 'root' })
export class OrdersResolve implements Resolve<IOrders> {
  constructor(private service: OrderService, private store: Store<fromCheckout.State>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IOrders> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<IOrders>) => response.ok),
        map((orders: HttpResponse<IOrders>) => {
          orders.body.orderDetails = JSON.parse(orders.body.orderDetails);

          console.log('orders', orders);
          // this.store.dispatch(OrderActions.selectOrder({ order: orders.body }));
          return orders.body;
        })
      );
    }

    return of(new Orders());
  }
}

export const routes: Routes = [
  {
    path: 'cart',
    component: ShoppingCartComponent,
    data: {
      authorities: ['ROLE_CUSTOMER'],
      pageTitle: 'Cart',
      route: 'cart',
      crumbs: [
        {
          label: 'Checkout',
        },
        {
          label: 'Shopping Cart',
        },
      ],
    },
    canActivate: [],
  },
  {
    path: 'form',
    component: OrderFormComponent,
    data: {
      authorities: ['ROLE_CUSTOMER'],
      pageTitle: 'Order',
      route: 'order',
      crumbs: [
        {
          label: 'Checkout',
        },
        {
          label: 'Order Form',
        },
      ],
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'payment/:id/secure',
    component: PaymentFormComponent,
    resolve: {
      orders: OrdersResolve,
    },
    data: {
      authorities: ['ROLE_CUSTOMER'],
      pageTitle: 'Payment',
      route: 'payment',
      crumbs: [
        {
          label: 'Checkout',
        },
        {
          label: 'Payment',
        },
      ],
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'success/:id',
    component: SuccessFormComponent,
    resolve: {
      orders: OrdersResolve,
    },
    data: {
      authorities: ['ROLE_CUSTOMER'],
      pageTitle: 'Success',
      route: 'success',
      crumbs: [
        {
          label: 'Checkout',
        },
        {
          label: 'Success',
        },
      ],
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'unsuccess/:id',
    component: UnSuccessFormComponent,
    resolve: {
      orders: OrdersResolve,
    },
    data: {
      authorities: ['ROLE_CUSTOMER'],
      pageTitle: 'Unsuccessful Payment',
      route: 'unsuccess',
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutRoutingModule {}
