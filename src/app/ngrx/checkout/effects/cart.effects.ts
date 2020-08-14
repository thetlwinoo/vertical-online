import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, filter, mergeMap, tap } from 'rxjs/operators';
import { IShoppingCarts } from '@vertical/models';
import { CartActions } from '../actions';
import { CartService, SpecialDealsService } from '@vertical/services';
import { deepParseJson } from 'deep-parse-json';

@Injectable()
export class CartEffects {
  fetchCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.fetchCart),
      switchMap(() =>
        this.cartService.getCart().pipe(
          filter((res: HttpResponse<IShoppingCarts>) => res.ok),
          map((res: HttpResponse<IShoppingCarts>) => {
            const cart: IShoppingCarts = res.body;
            if (cart) {
              cart.dealString = cart.dealString ? JSON.parse(cart.dealString) : null;
              cart.cartDetails = cart.cartDetails ? JSON.parse(cart.cartDetails) : null;
              cart.packageDetails = cart.packageDetails ? deepParseJson(cart.packageDetails) : null;
            }

            return CartActions.fetchCartSuccess({ cart });
          }),
          catchError(err => of(CartActions.shoppingCartError({ errorMsg: err.message })))
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
          switchMap((res: HttpResponse<IShoppingCarts>) => {
            const cart: IShoppingCarts = res.body;
            if (cart) {
              cart.dealString = cart.dealString ? JSON.parse(cart.dealString) : null;
              cart.cartDetails = cart.cartDetails ? JSON.parse(cart.cartDetails) : null;
              cart.packageDetails = cart.packageDetails ? deepParseJson(cart.packageDetails) : null;
            }

            return [CartActions.addToCartSuccess({ cart }), CartActions.setCart({ cart })];
          }),
          catchError(err => of(CartActions.shoppingCartError({ errorMsg: err.message })))
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
          switchMap((res: HttpResponse<IShoppingCarts>) => {
            const cart: IShoppingCarts = res.body;
            if (cart) {
              cart.dealString = cart.dealString ? JSON.parse(cart.dealString) : null;
              cart.cartDetails = cart.cartDetails ? JSON.parse(cart.cartDetails) : null;
              cart.packageDetails = cart.packageDetails ? deepParseJson(cart.packageDetails) : null;
            }

            return [CartActions.reduceFromCartSuccess({ cart }), CartActions.setCart({ cart })];
          }),
          catchError(err => of(CartActions.shoppingCartError({ errorMsg: err.message })))
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
          switchMap((res: HttpResponse<IShoppingCarts>) => {
            const cart: IShoppingCarts = res.body;

            if (cart) {
              cart.dealString = cart.dealString ? JSON.parse(cart.dealString) : null;
              cart.cartDetails = cart.cartDetails ? JSON.parse(cart.cartDetails) : null;
              cart.packageDetails = cart.packageDetails ? deepParseJson(cart.packageDetails) : null;
            }

            return [CartActions.removeFromCartSuccess({ cart }), CartActions.setCart({ cart })];
          }),
          catchError(err => of(CartActions.shoppingCartError({ errorMsg: err.message })))
        )
      )
    )
  );

  removeListFromCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.removeListFromCart),
      mergeMap(({ idList }) =>
        this.cartService.removeListFromCart(idList).pipe(
          filter((res: HttpResponse<IShoppingCarts>) => res.ok),
          switchMap((res: HttpResponse<IShoppingCarts>) => {
            const cart: IShoppingCarts = res.body;

            if (cart) {
              cart.dealString = cart.dealString ? JSON.parse(cart.dealString) : null;
              cart.cartDetails = cart.cartDetails ? JSON.parse(cart.cartDetails) : null;
              cart.packageDetails = cart.packageDetails ? deepParseJson(cart.packageDetails) : null;
            }

            return [CartActions.removeListFromCartSuccess({ cart }), CartActions.setCart({ cart })];
          }),
          catchError(err => of(CartActions.shoppingCartError({ errorMsg: err.message })))
        )
      )
    )
  );

  changedAddToOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.changedAddToOrder),
      mergeMap(({ props }) =>
        this.cartService.changedAddToOrder(props.id, props.isAddToOrder).pipe(
          filter((res: HttpResponse<IShoppingCarts>) => res.ok),
          switchMap((res: HttpResponse<IShoppingCarts>) => {
            const cart: IShoppingCarts = res.body;
            if (cart) {
              cart.dealString = cart.dealString ? JSON.parse(cart.dealString) : null;
              cart.cartDetails = cart.cartDetails ? JSON.parse(cart.cartDetails) : null;
              cart.packageDetails = cart.packageDetails ? deepParseJson(cart.packageDetails) : null;
            }

            return [CartActions.changedAddToOrderSuccess({ cart }), CartActions.setCart({ cart })];
          }),
          catchError(err => of(CartActions.shoppingCartError({ errorMsg: err.message })))
        )
      )
    )
  );

  changeOrderAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.changedOrderAll),
      mergeMap(({ props }) =>
        this.cartService.changeOrderAll(props).pipe(
          filter((res: HttpResponse<IShoppingCarts>) => res.ok),
          switchMap((res: HttpResponse<IShoppingCarts>) => {
            const cart: IShoppingCarts = res.body;
            if (cart) {
              cart.dealString = cart.dealString ? JSON.parse(cart.dealString) : null;
              cart.cartDetails = cart.cartDetails ? JSON.parse(cart.cartDetails) : null;
              cart.packageDetails = cart.packageDetails ? deepParseJson(cart.packageDetails) : null;
            }

            return [CartActions.changedOrderAllSuccess({ cart }), CartActions.setCart({ cart })];
          }),
          catchError(err => of(CartActions.shoppingCartError({ errorMsg: err.message })))
        )
      )
    )
  );

  changeDeliveryMethod$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.changeDeliveryMethod),
      mergeMap(({ props }) =>
        this.cartService.changeDeliveryMethod(props).pipe(
          filter((res: HttpResponse<IShoppingCarts>) => res.ok),
          switchMap((res: HttpResponse<IShoppingCarts>) => {
            const cart: IShoppingCarts = res.body;
            if (cart) {
              cart.dealString = cart.dealString ? JSON.parse(cart.dealString) : null;
              cart.cartDetails = cart.cartDetails ? JSON.parse(cart.cartDetails) : null;
              cart.packageDetails = cart.packageDetails ? deepParseJson(cart.packageDetails) : null;
            }

            return [CartActions.changeDeliveryMethodSuccess({ cart }), CartActions.setCart({ cart })];
          }),
          catchError(err => of(CartActions.shoppingCartError({ errorMsg: err.message })))
        )
      )
    )
  );

  applyDiscount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.applyDiscount),
      mergeMap(({ code }) => {
        console.log('apply code', code);
        return this.specialDealsService.applyDiscount(code).pipe(
          filter((res: HttpResponse<IShoppingCarts>) => res.ok),
          switchMap((res: HttpResponse<IShoppingCarts>) => {
            const cart: IShoppingCarts = res.body;
            if (cart) {
              cart.dealString = cart.dealString ? JSON.parse(cart.dealString) : null;
              cart.cartDetails = cart.cartDetails ? JSON.parse(cart.cartDetails) : null;
              cart.packageDetails = cart.packageDetails ? deepParseJson(cart.packageDetails) : null;
            }

            return [CartActions.applyDiscountSuccess({ cart }), CartActions.setCart({ cart })];
          }),
          catchError(err => of(CartActions.shoppingCartError({ errorMsg: err.message })))
        );
      })
    )
  );

  // emptyCart$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(CartActions.emptyCart),
  //     switchMap(() =>
  //       this.cartService.emptyCart().pipe(
  //         filter((res: HttpResponse<any>) => res.ok),
  //         map((res: HttpResponse<any>) => CartActions.emptyCartSuccess({ success: res.body })),
  //         catchError(err => of(CartActions.shoppingCartError({ errorMsg: err.message })))
  //       )
  //     )
  //   )
  // );

  constructor(private actions$: Actions, private cartService: CartService, private specialDealsService: SpecialDealsService) {}
}
