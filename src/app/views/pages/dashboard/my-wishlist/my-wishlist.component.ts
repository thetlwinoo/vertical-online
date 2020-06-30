import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IStockItems, AddToCartProps } from '@eps/models';
import { select, Store } from '@ngrx/store';
import * as fromCheckout from 'app/ngrx/checkout/reducers';
import * as fromProduct from 'app/ngrx/products/reducers';
import { WishlistActions, SelectedStockItemPageActions } from 'app/ngrx/products/actions';
import { CartActions } from 'app/ngrx/checkout/actions';
import { SERVER_API_URL } from '@eps/constants';

@Component({
  selector: 'app-my-wishlist',
  templateUrl: './my-wishlist.component.html',
  styleUrls: ['./my-wishlist.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MyWishlistComponent implements OnInit {
  wishlistItems$: Observable<IStockItems[]>;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;

  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/photos';
  public extendUrl = SERVER_API_URL + 'services/vscommerce/api/photos-extend';
  public blobUrl = SERVER_API_URL + 'services/cloudblob/api/images-extend/';

  constructor(private store: Store<fromProduct.State>, private checkoutStore: Store<fromCheckout.State>) {
    this.wishlistItems$ = store.pipe(select(fromProduct.getWishlistStockItems));
    this.loading$ = store.pipe(select(fromProduct.getWishlistLoading));
    this.loaded$ = store.pipe(select(fromProduct.getWishlistLoaded));

    // this.wishlistItems$.subscribe(data => console.log('wishlist prod', data));
  }

  ngOnInit(): void {
    this.store.dispatch(WishlistActions.loadWishlist());
  }

  removeFromWishlist(event): void {
    this.store.dispatch(SelectedStockItemPageActions.removeStockItemFromWishlist({ stockItem: event }));
  }

  addToCart(stockItem: IStockItems): void {
    const props: AddToCartProps = {
      id: stockItem.id,
      quantity: 1,
    };
    this.checkoutStore.dispatch(CartActions.addToCart({ props }));
  }
}
