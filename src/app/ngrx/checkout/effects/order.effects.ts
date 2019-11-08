import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, filter, mergeMap, tap, takeLast, flatMap, last } from 'rxjs/operators';
import { IOrders } from '@epm/models';
import { OrderActions, CartActions } from '../actions';
import { OrderService } from '@epm/services';

@Injectable()
export class OrderEffects {
    fetchOrder$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OrderActions.fetchOrder),
            switchMap(() =>
                this.orderService.getAllOrdersWithoutPaging().pipe(
                    filter((res: HttpResponse<IOrders[]>) => res.ok),
                    map((res: HttpResponse<IOrders[]>) =>
                        OrderActions.fetchOrderSuccess({ orders: res.body })
                    ),
                    catchError(err =>
                        of(OrderActions.orderError({ errorMsg: err.message }))
                    )
                )
            )
        )
    );

    postOrder$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OrderActions.postOrder),
            mergeMap(({ order }) =>
                this.orderService.postOrder(order).pipe(
                    filter((res: HttpResponse<IOrders>) => res.ok),
                    switchMap((res: HttpResponse<IOrders>) =>
                        [
                            OrderActions.emptyOrder(),
                            CartActions.emptyCart(),
                            OrderActions.postOrderSuccess({ order: res.body })
                        ]
                    ),
                    // tap(() => this.router.navigate(['/checkout/payment'])),
                    catchError(err =>
                        of(OrderActions.orderError({ errorMsg: err.message }))
                    )
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private router: Router,
        private orderService: OrderService
    ) { }
}