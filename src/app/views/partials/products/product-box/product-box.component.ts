import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  AfterViewInit
} from "@angular/core";
import { IProducts, IStockItems } from "@eps/models";

import { FetchActions } from "app/ngrx/products/actions";
import * as fromProducts from "app/ngrx/products/reducers";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "product-box",
  templateUrl: "./product-box.component.html",
  styleUrls: ["./product-box.component.scss"]
})
export class ProductBoxComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() product;
  @Input() mode;

  stockItems$: Observable<IProducts[]>;

  // imageList: String[];
  defaultImage: String;
  defaultUnitPrice: number;
  defaultRecommendedRetailPrice: number;

  constructor(private store: Store<fromProducts.State>) {
    // this.stockItems$ = store.pipe(select(fromProducts.getFetchStockItems));

    // this.stockItems$.subscribe(res=> console.log('sub',res))
  }

  ngOnInit() {}

  ngAfterViewInit() {
    // this.imageList = this.product.thumbnailList.split(";");
    this.defaultImage = this.product.stockItemsDTOList[0].thumbnailUrl;
    this.defaultUnitPrice = this.product.stockItemsDTOList[0].unitPrice;
    this.defaultRecommendedRetailPrice = this.product.stockItemsDTOList[0].recommendedRetailPrice;

    // if (this.product) {
    //   this.store.dispatch(FetchActions.fetchStockItems(this.product.id));
    // }
  }
  ngOnDestroy() {}

  changeStockItem(stockItem) {
    this.defaultImage = stockItem.thumbnailUrl;
    this.defaultUnitPrice = stockItem.unitPrice;
    this.defaultRecommendedRetailPrice = stockItem.recommendedRetailPrice;
  }
}
