import { Component, Input, OnDestroy, OnInit, AfterViewInit, OnChanges } from '@angular/core';
import { IProducts, IStockItems, StockItems } from '@vertical/models';

import { FetchActions } from 'app/ngrx/products/actions';
import * as fromProducts from 'app/ngrx/products/reducers';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '@vertical/constants';

interface StockItemObj {
  id: number;
  name: string;
  unitPrice: number;
  recommendedRetailPrice: number;
  thumbnailPhoto: string;
}

@Component({
  selector: 'product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.scss'],
})
export class ProductBoxComponent implements OnInit, OnDestroy, OnChanges {
  @Input() product;
  @Input() mode;
  @Input() loading;

  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/photos';
  public extendUrl = SERVER_API_URL + 'services/vscommerce/api/photos-extend';
  public blobUrl = SERVER_API_URL + 'services/cloudblob/api/images-extend/';
  // stockItems$: Observable<IProducts[]>;
  selectedItem: StockItemObj = null;

  constructor(private store: Store<fromProducts.State>) {
    // this.stockItems$ = store.pipe(select(fromProducts.getFetchStockItems));
    // this.stockItems$.subscribe(res => console.log('sub', res));
  }

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.product && this.product.productDetails.stockItemLists.length > 0) {
      this.selectedItem = this.product.productDetails.stockItemLists[0];
    }
  }
  
  ngOnDestroy(): void {}

  changeStockItem(stockItem): void {
    this.selectedItem = stockItem;
  }

  getPercentage(stockItem: IStockItems): string {
    const increase = stockItem.unitPrice - stockItem.recommendedRetailPrice;
    const percentage = (increase / stockItem.recommendedRetailPrice) * 100;

    return percentage.toString() + ' %';
  }
}
