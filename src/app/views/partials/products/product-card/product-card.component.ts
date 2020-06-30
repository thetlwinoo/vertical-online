import { OnInit, Component, ViewEncapsulation, Input, OnDestroy, Output, EventEmitter, OnChanges } from '@angular/core';
import { SERVER_API_URL } from '@eps/constants';

interface StockItemObj {
  stockItemId: number;
  unitPrice: number;
  recommendedRetailPrice: number;
  thumbnail: string;
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
    if (this.product && this.product.productDetails.length > 0) {
      this.selectedItem = this.product.productDetails[0];
    }
  }

  ngOnDestroy(): void {}
}
