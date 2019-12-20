import { OnInit, Component, ViewEncapsulation, Input, OnDestroy, Output, EventEmitter, AfterViewInit } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() product;
  @Output() quickview = new EventEmitter<any>();

  defaultImage: String;
  defaultUnitPrice: number;
  defaultRecommendedRetailPrice: number;

  title;
  rating: number = 4;
  lowestPrice: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {    
    this.defaultImage = this.product.stockItemsDTOList[0].thumbnailUrl;
    this.defaultUnitPrice = this.product.stockItemsDTOList[0].unitPrice;
    this.defaultRecommendedRetailPrice = this.product.stockItemsDTOList[0].recommendedRetailPrice;
  }

  ngOnDestroy() {}

  changeStockItem(stockItem) {
    this.defaultImage = stockItem.thumbnailUrl;
    this.defaultUnitPrice = stockItem.unitPrice;
    this.defaultRecommendedRetailPrice = stockItem.recommendedRetailPrice;
  }
}
