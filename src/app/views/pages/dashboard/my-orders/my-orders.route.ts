import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/services/user-route-access.service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MyOrdersComponent } from './my-orders.component';
import { OrderService } from 'app/core/e-commerce/_services';
import { Orders, IOrders } from 'app/core/e-commerce/_models';
import { OrderDetailsComponent } from './order-details/order-details.component';

@Injectable({ providedIn: 'root' })
export class MyOrdersResolve implements Resolve<Orders> {
    constructor(private service: OrderService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Orders> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.getOrder(id).pipe(
                filter((response: HttpResponse<Orders>) => response.ok),
                map((orders: HttpResponse<Orders>) => orders.body)
            );
        }
        return of(new Orders());
    }
}

export const myOrdersRoute: Routes = [
    {
        path: '',
        component: MyOrdersComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'My Orders'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: OrderDetailsComponent,
        resolve: {
            orders: MyOrdersResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Order Details'
        },
        canActivate: [UserRouteAccessService]
    },
];
