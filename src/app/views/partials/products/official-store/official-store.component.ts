import { OnInit, Component, ViewEncapsulation, Input, OnDestroy, Output, EventEmitter, OnChanges } from '@angular/core';
import { SERVER_API_URL } from '@vertical/constants';
import { IStockItems } from '@vertical/models';

interface StockItemObj {
  id: number;
  unitPrice: number;
  recommendedRetailPrice: number;
  thumbnailPhoto: string;
}

@Component({
  selector: 'official-store',
  templateUrl: './official-store.component.html',
  styleUrls: ['./official-store.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class OfficialStoreComponent implements OnInit, OnDestroy, OnChanges {
  @Input() supplier;
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

  ngOnChanges(): void {}

  getPercentate(stockItem: IStockItems): number {
    const decrease = stockItem.recommendedRetailPrice - stockItem.unitPrice;
    const percentage = Math.round((decrease / stockItem.recommendedRetailPrice) * 100);

    return percentage;
  }

  getProductPhoto(index: number): string {
    return this.supplier.supplierProducts[index].productDetails.stockItemLists[0].thumbnailPhoto;
  }
  ngOnDestroy(): void {}
}
