import { Component, Input, OnDestroy, OnInit, AfterViewInit, OnChanges } from '@angular/core';
import { IProducts, IStockItems, StockItems } from '@eps/models';

import { FetchActions } from 'app/ngrx/products/actions';
import * as fromProducts from 'app/ngrx/products/reducers';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '@eps/constants';

interface StockItemObj {
  stockItemId: number;
  unitPrice: number;
  recommendedRetailPrice: number;
  thumbnail: string;
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
    if (this.product && this.product.productDetails.length > 0) {
      this.selectedItem = this.product.productDetails[0];
    }
  }
  ngOnDestroy(): void {}

  changeStockItem(stockItem): void {
    this.selectedItem = stockItem;
  }
}
