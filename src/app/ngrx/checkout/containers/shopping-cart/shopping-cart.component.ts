import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IShoppingCarts, ChangedOrderAllProps } from '@vertical/models';
import * as fromCheckout from 'app/ngrx/checkout/reducers';
import { CartActions } from 'app/ngrx/checkout/actions';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-shopping-cart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  cart$: Observable<IShoppingCarts>;
  cartPrice$: Observable<number>;
  itemCount$: Observable<number>;
  totalQuantity$: Observable<number>;
  loaded$: Observable<boolean>;
  loading$: Observable<boolean>;
  constructor(private store: Store<fromCheckout.State>, private msg: NzMessageService) {
    this.cart$ = store.pipe(select(fromCheckout.getCartState)) as Observable<IShoppingCarts>;
    this.cartPrice$ = store.pipe(select(fromCheckout.getCartTotalPrice));
    this.itemCount$ = store.pipe(select(fromCheckout.getCartItemCount));
    this.totalQuantity$ = store.pipe(select(fromCheckout.getCartTotalQuantity));
    this.loading$ = store.pipe(select(fromCheckout.getCartLoading));
  }

  ngOnInit(): void {
    this.store.dispatch(CartActions.fetchCart());
  }

  applyCode(event): void {
    this.store.dispatch(CartActions.applyDiscount({ code: event }));
  }

  addToCart(event): void {
    // const _addToCartMessage = 'Add To Cart';
    console.log('add cart', event);
    this.store.dispatch(CartActions.addToCart({ props: event }));
    // this.layoutUtilsService.showActionNotification(_addToCartMessage, MessageType.Create);
    // this.msg.success('Add to cart success');
  }

  reduceFromCart(event): void {
    this.store.dispatch(CartActions.reduceFromCart({ props: event }));
    // this.msg.success('Reduce from cart success');
  }

  removeFromCart(id): void {
    this.store.dispatch(CartActions.removeFromCart({ id }));
    this.msg.success('Selected Cart Item(s) successfully removed');
  }

  removeListFromCart(idList): void {
    this.store.dispatch(CartActions.removeListFromCart({ idList }));
    // this.msg.success('Remove list from cart success');
  }

  changedAddToOrder(event): void {
    this.store.dispatch(CartActions.changedAddToOrder({ props: event }));
    // this.msg.success('Changed Add To Order success');
  }

  changedOrderAll(checked): void {
    this.store.dispatch(CartActions.changedOrderAll({ props: { checked, packageId: null } }));
    // this.msg.success('Changed All success');
  }

  changedPackageAll(props: ChangedOrderAllProps): void {
    this.store.dispatch(CartActions.changedOrderAll({ props }));
    // this.msg.success('Changed Package success');
  }
}
