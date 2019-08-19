import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, filter, mergeMap } from 'rxjs/operators';
import { IOrders } from '@root/models';
import { OrderActions, CartActions } from '../actions';
import { OrderService } from '@root/services';

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
                            OrderActions.postOrderSuccess({ order: res.body }),
                            OrderActions.emptyOrder,
                            CartActions.emptyCart
                        ]
                    ),
                    catchError(err =>
                        of(OrderActions.orderError({ errorMsg: err.message }))
                    )
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private orderService: OrderService
    ) { }
}