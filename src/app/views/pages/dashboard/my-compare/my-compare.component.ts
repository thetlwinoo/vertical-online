import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { IProducts, AddToCartProps } from '@eps/models';
import { select, Store } from '@ngrx/store';
import * as fromCheckout from 'app/ngrx/checkout/reducers';
import * as fromProduct from 'app/ngrx/products/reducers';
import { CompareActions, SelectedProductPageActions } from 'app/ngrx/products/actions';
import { CartActions } from 'app/ngrx/checkout/actions';

@Component({
  selector: 'app-my-compare',
  templateUrl: './my-compare.component.html',
  styleUrls: ['./my-compare.component.scss']
})
export class MyCompareComponent implements OnInit {
  products$: Observable<IProducts[]>;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;

  constructor(
    private store: Store<fromProduct.State>,
    private checkoutStore: Store<fromCheckout.State>,
  ) {
    this.products$ = store.pipe(select(fromProduct.getCompareProducts)) as Observable<IProducts[]>;
    this.loading$ = store.pipe(select(fromProduct.getCompareLoading)) as Observable<boolean>;
    this.loaded$ = store.pipe(select(fromProduct.getCompareLoaded)) as Observable<boolean>;

    this.products$.subscribe(data=> console.log('compare prod',data))
  }

  ngOnInit() {
    this.store.dispatch(CompareActions.loadCompare());
  }

  removeFromCompare(event) {
    this.store.dispatch(SelectedProductPageActions.removeProductFromCompare({ product: event }));
  }

  addToCart(product: IProducts) {
    let props: AddToCartProps = {
      id: product.id,
      quantity: 1
    };
    this.checkoutStore.dispatch(CartActions.addToCart({ props: props }));
  }
}
