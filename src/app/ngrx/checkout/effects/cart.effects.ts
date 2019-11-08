import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, filter, mergeMap, tap } from 'rxjs/operators';
import { IShoppingCarts } from '@epm/models';
import { CartActions } from '../actions';
import { CartService } from '@epm/services';
import { LayoutUtilsService, MessageType } from '@epm/services/_base/crud';

@Injectable()
export class CartEffects {
    fetchCart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CartActions.fetchCart),
            switchMap(() =>
                this.cartService.getCart().pipe(
                    filter((res: HttpResponse<IShoppingCarts>) => res.ok),
                    map((res: HttpResponse<IShoppingCarts>) =>
                        CartActions.fetchCartSuccess({ cart: res.body })
                    ),
                    catchError(err =>
                        of(CartActions.shoppingCartError({ errorMsg: err.message }))
                    )
                )
            )
        )
    );

    addToCart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CartActions.addToCart),
            mergeMap(({ props }) =>
                this.cartService.postCart(props.id, props.quantity).pipe(
                    filter((res: HttpResponse<IShoppingCarts>) => res.ok),
                    switchMap((res: HttpResponse<IShoppingCarts>) =>
                        [CartActions.addToCartSuccess({ cart: res.body }), CartActions.setCart({ cart: res.body })]
                    ),
                    // tap(()=>{
                    //     this.layoutUtilsService.showActionNotification("Add To Cart Success", MessageType.Create);
                    // }),                    
                    catchError(err =>
                        of(CartActions.shoppingCartError({ errorMsg: err.message }))
                    )
                )
            )
        )
    );

    reduceFromCart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CartActions.reduceFromCart),
            mergeMap(({ props }) =>
                this.cartService.reduceFromCart(props.id, props.quantity).pipe(
                    filter((res: HttpResponse<IShoppingCarts>) => res.ok),
                    switchMap((res: HttpResponse<IShoppingCarts>) =>
                        [CartActions.reduceFromCartSuccess({ cart: res.body }), CartActions.setCart({ cart: res.body })]
                    ),
                    catchError(err =>
                        of(CartActions.shoppingCartError({ errorMsg: err.message }))
                    )
                )
            )
        )
    );

    removeFromCart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CartActions.removeFromCart),
            mergeMap(({ id }) =>
                this.cartService.removeFromCart(id).pipe(
                    filter((res: HttpResponse<IShoppingCarts>) => res.ok),
                    switchMap((res: HttpResponse<IShoppingCarts>) =>
                        [CartActions.removeFromCartSuccess({ cart: res.body }), CartActions.setCart({ cart: res.body })]
                    ),
                    catchError(err =>
                        of(CartActions.shoppingCartError({ errorMsg: err.message }))
                    )
                )
            )
        )
    );

    applyDiscountCode$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CartActions.applyDiscount),
            mergeMap(({ code }) =>
                this.cartService.applyDiscount(code).pipe(
                    filter((res: HttpResponse<IShoppingCarts>) => res.ok),
                    switchMap((res: HttpResponse<IShoppingCarts>) =>
                        [CartActions.applyDiscountSuccess({ cart: res.body }), CartActions.setCart]
                    ),
                    catchError(err =>
                        of(CartActions.shoppingCartError({ errorMsg: err.message }))
                    )
                )
            )
        )
    );

    emptyCart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CartActions.emptyCart),
            switchMap(() =>
                this.cartService.emptyCart().pipe(
                    filter((res: HttpResponse<any>) => res.ok),
                    map((res: HttpResponse<any>) =>
                        CartActions.emptyCartSuccess({ success: res.body })
                    ),
                    catchError(err =>
                        of(CartActions.shoppingCartError({ errorMsg: err.message }))
                    )
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private layoutUtilsService: LayoutUtilsService,
        private cartService: CartService
    ) { }
}