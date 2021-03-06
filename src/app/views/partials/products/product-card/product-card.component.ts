import { OnInit, Component, ViewEncapsulation, Input, OnDestroy, Output, EventEmitter, OnChanges } from '@angular/core';
import { SERVER_API_URL } from '@vertical/constants';
import { IStockItems } from '@vertical/models';

interface StockItemObj {
  id: number;
  name: string;
  unitPrice: number;
  recommendedRetailPrice: number;
  thumbnailPhoto: string;
}

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductCardComponent implements OnInit, OnDestroy, OnChanges {
  @Input() product;
  @Output() quickview = new EventEmitter<any>();

  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/photos';
  public extendUrl = SERVER_API_URL + 'services/vscommerce/api/photos-extend';
  public blobUrl = SERVER_API_URL + 'services/cloudblob/api/images-extend/';

  selectedItem: StockItemObj;

  title;
  rating = 4;
  lowestPrice = false;
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.product?.productDetails?.stockItemLists?.length > 0) {
      this.selectedItem = this.product.productDetails.stockItemLists[0];
    }
  }

  getPercentage(stockItem: IStockItems): number {
    const decrease = stockItem.unitPrice - stockItem.recommendedRetailPrice;
    const percentage = Math.round((decrease / stockItem.unitPrice) * 100);

    return percentage;
  }

  ngOnDestroy(): void {}
}
