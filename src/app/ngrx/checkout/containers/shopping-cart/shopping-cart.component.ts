import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IShoppingCarts } from '@root/models';
import * as fromCheckout from 'app/ngrx/checkout/reducers';
import { CartActions } from 'app/ngrx/checkout/actions';
import { LayoutUtilsService, MessageType } from '@root/services/_base/crud';

@Component({
  selector: 'app-shopping-cart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  cart$: Observable<IShoppingCarts>;
  cartPrice$: Observable<number>;
  itemCount$: Observable<number>;
  totalQuantity$: Observable<number>;
  loaded$: Observable<boolean>;
  constructor(
    private store: Store<fromCheckout.State>,
    private layoutUtilsService: LayoutUtilsService,
  ) {
    this.cart$ = store.pipe(select(fromCheckout.getCartState)) as Observable<IShoppingCarts>;
    this.cartPrice$ = store.pipe(select(fromCheckout.getCartTotalPrice)) as Observable<number>;
    this.itemCount$ = store.pipe(select(fromCheckout.getCartItemCount)) as Observable<number>;
    this.totalQuantity$ = store.pipe(select(fromCheckout.getCartTotalQuantity)) as Observable<number>;
    this.cartPrice$ = store.pipe(select(fromCheckout.getCartTotalPrice)) as Observable<number>;
  }

  ngOnInit() {
  }

  applyCode(event) {
    this.store.dispatch(CartActions.applyDiscount({ code: event }));
  }

  addToCart(event) {
    const _addToCartMessage = "Add To Cart";

    this.store.dispatch(CartActions.addToCart({ props: event }));
    this.layoutUtilsService.showActionNotification(_addToCartMessage, MessageType.Create);
  }

  reduceFromCart(event) {
    this.store.dispatch(CartActions.reduceFromCart({ props: event }));
  }

  removeFromCart(id) {
    this.store.dispatch(CartActions.removeFromCart({ id: id }));
  }
}
