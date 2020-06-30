import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IStockItems, AddToCartProps } from '@eps/models';
import { select, Store } from '@ngrx/store';
import * as fromCheckout from 'app/ngrx/checkout/reducers';
import * as fromProduct from 'app/ngrx/products/reducers';
import { CompareActions, SelectedStockItemPageActions } from 'app/ngrx/products/actions';
import { CartActions } from 'app/ngrx/checkout/actions';
import { SERVER_API_URL } from '@eps/constants';
import { deal } from '@eps/config/owl-carousel';
import { rootAnimations } from '@eps/animations';

@Component({
  selector: 'app-my-compare',
  templateUrl: './my-compare.component.html',
  styleUrls: ['./my-compare.component.scss'],
  animations: rootAnimations,
})
export class MyCompareComponent implements OnInit {
  stockItems$: Observable<IStockItems[]>;
  stockItems: IStockItems[];
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  carousel: any = deal;
  ghosts = [];

  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/photos';
  public extendUrl = SERVER_API_URL + 'services/vscommerce/api/photos-extend';
  public blobUrl = SERVER_API_URL + 'services/cloudblob/api/images-extend/';

  constructor(private store: Store<fromProduct.State>, private checkoutStore: Store<fromCheckout.State>) {
    this.stockItems$ = store.pipe(select(fromProduct.getCompareStockItems));
    this.loading$ = store.pipe(select(fromProduct.getCompareLoading));
    this.loaded$ = store.pipe(select(fromProduct.getCompareLoaded));
    this.ghosts = new Array(10);
    this.stockItems$.subscribe(data => (this.stockItems = data));
  }

  ngOnInit(): void {
    this.store.dispatch(CompareActions.loadCompare());
  }

  removeFromCompare(event): void {
    this.store.dispatch(SelectedStockItemPageActions.removeStockItemFromCompare({ stockItem: event }));
  }

  addToCart(stockItem: IStockItems): void {
    const props: AddToCartProps = {
      id: stockItem.id,
      quantity: 1,
    };
    this.checkoutStore.dispatch(CartActions.addToCart({ props }));
  }
}
