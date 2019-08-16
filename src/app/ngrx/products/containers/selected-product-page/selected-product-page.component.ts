import { ChangeDetectionStrategy, Component } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { SelectedProductPageActions, CompareActions, WishlistActions } from 'app/ngrx/products/actions';
import { IProducts } from '@root/models';
import * as fromProducts from 'app/ngrx/products/reducers';

@Component({
  selector: 'selected-product-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './selected-product-page.component.html',
  styleUrls: ['./selected-product-page.component.scss']
})
export class SelectedProductPageComponent {
  product$: Observable<IProducts>;
  isSelectedProductInCompare$: Observable<boolean>;
  isSelectedProductInWishlist$: Observable<boolean>;

  constructor(
    private store: Store<fromProducts.State>
  ) {
    this.product$ = store.pipe(select(fromProducts.getSelectedProduct)) as Observable<IProducts>;
    this.isSelectedProductInCompare$ = store.pipe(select(fromProducts.isSelectedProductInCompare));
    this.isSelectedProductInWishlist$ = store.pipe(select(fromProducts.isSelectedProductInWishlist));
  }

  ngOnInit() {
    this.store.dispatch(CompareActions.loadCompare());
    this.store.dispatch(WishlistActions.loadWishlist());
  }

  addToCompare(product: IProducts) {
    this.store.dispatch(SelectedProductPageActions.addProductToCompare({ product }));
  }

  removeFromCompare(product: IProducts) {
    this.store.dispatch(SelectedProductPageActions.removeProductFromCompare({ product }));
  }

  addToWishlist(product: IProducts) {
    this.store.dispatch(SelectedProductPageActions.addProductToWishlist({ product }));
  }

  removeFromWishlist(product: IProducts) {
    this.store.dispatch(SelectedProductPageActions.removeProductFromWishlist({ product }));
  }
}
