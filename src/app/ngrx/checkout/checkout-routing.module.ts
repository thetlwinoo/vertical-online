import { NgModule, Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, RouterModule } from '@angular/router';
import { BreadcrumbGuard } from '@epm/services';
import { UserRouteAccessService } from '@epm/services/core/auth/user-route-access.service';
import { ShoppingCartComponent } from './containers/shopping-cart/shopping-cart.component';
import { OrderFormComponent } from './containers/order-form/order-form.component';
import { PaymentFormComponent } from './containers/payment-form/payment-form.component';
import { SuccessFormComponent } from './containers/success-form/success-form.component';
import { IOrders, Orders } from '@epm/models';
import { OrderService } from "@epm/services";
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class OrdersResolve implements Resolve<IOrders> {
    constructor(private service: OrderService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IOrders> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<IOrders>) => response.ok),
                map((orders: HttpResponse<IOrders>) => orders.body)
            );
        }
        return of(new Orders());
    }
}

export const routes: Routes = [
    {
        path: 'cart', component: ShoppingCartComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cart',
            route: 'cart',
            crumbs: [
                {
                    label: 'Checkout'
                },
                {
                    label: 'Shopping Cart'
                }
            ]
        },
        canActivate: [BreadcrumbGuard]
    },
    {
        path: 'form', component: OrderFormComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Order',
            route: 'order',
            crumbs: [
                {
                    label: 'Checkout'
                },
                {
                    label: 'Order Form'
                }
            ]
        },
        canActivate: [UserRouteAccessService, BreadcrumbGuard]
    },
    {
        path: 'payment/:id/secure', component: PaymentFormComponent,
        resolve: {
            orders: OrdersResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Payment',
            route: 'payment',
            crumbs: [
                {
                    label: 'Checkout'
                },
                {
                    label: 'Payment'
                }
            ]
        },
        canActivate: [UserRouteAccessService, BreadcrumbGuard]
    },
    {
        path: 'success/:id', component: SuccessFormComponent,
        resolve: {
            orders: OrdersResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Success',
            route: 'success',
            crumbs: [
                {
                    label: 'Checkout'
                },
                {
                    label: 'Success'
                }
            ]
        },
        canActivate: [UserRouteAccessService, BreadcrumbGuard]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule],
})
export class CheckoutRoutingModule { }
