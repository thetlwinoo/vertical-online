import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { IProducts, AddToCartProps } from '@root/models';
import { select, Store } from '@ngrx/store';
import * as fromCheckout from 'app/ngrx/checkout/reducers';
import * as fromProduct from 'app/ngrx/products/reducers';
import { WishlistActions, SelectedProductPageActions } from 'app/ngrx/products/actions';
import { CartActions } from 'app/ngrx/checkout/actions';

@Component({
  selector: 'app-my-wishlist',
  templateUrl: './my-wishlist.component.html',
  styleUrls: ['./my-wishlist.component.scss']
})
export class MyWishlistComponent implements OnInit {
  products$: Observable<IProducts[]>;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;

  constructor(
    private store: Store<fromProduct.State>,
    private checkoutStore: Store<fromCheckout.State>,
  ) {
    this.products$ = store.pipe(select(fromProduct.getWishlistProducts)) as Observable<IProducts[]>;
    this.loading$ = store.pipe(select(fromProduct.getWishlistLoading)) as Observable<boolean>;
    this.loaded$ = store.pipe(select(fromProduct.getWishlistLoaded)) as Observable<boolean>;

    this.products$.subscribe(data=> console.log('wishlist prod',data))
  }

  ngOnInit() {
    this.store.dispatch(WishlistActions.loadWishlist());
  }

  removeFromWishlist(event) {
    this.store.dispatch(SelectedProductPageActions.removeProductFromWishlist({ product: event }));
  }

  addToCart(product: IProducts) {
    let props: AddToCartProps = {
      id: product.id,
      quantity: 1
    };
    this.checkoutStore.dispatch(CartActions.addToCart({ props: props }));
  }
}
