import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from "@root/services";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";
import { map } from 'rxjs/operators';
import { ColorFilter, IProducts } from '@root/models';
import { TreeNode, SelectItem } from 'primeng/api';
import { RootSidebarService } from '@root/components/sidebar/sidebar.service';
import { Store, select } from "@ngrx/store";

import { ProductActions } from 'app/ngrx/products/actions';
import * as fromProducts from 'app/ngrx/products/reducers';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  // browseState: Observable<{ products: IProducts[], errors: HttpError[], loading: boolean }>;
  private subscriptions: Subscription[] = [];
  // page: number = 0;
  keyword: string;
  canFetch: boolean = false;
  // querySubscribe: Subscription;
  public categories: any[] = [];
  public categoriesTree: any;
  public colors: any[] = [];
  public price: any;
  public rangePrice: any = [0, 0];

  products: any[] = [];
  products$: Observable<IProducts[]>;
  loading$: Observable<boolean>;
  error$: Observable<string>;
  public filteredItems: any[] = [];

  public colorFilters: ColorFilter[] = [];
  public categoriesFilters: any[] = [];
  public priceFilters: any[] = [];

  public dataViewOptions = {
    loading: true,
    layout: 'grid'
  };

  sortOptions: SelectItem[];
  sortKey: string;
  sortField: string;
  sortOrder: number;
  loading: boolean;
  totalRecords: number = 1000;

  constructor(
    private productService: ProductsService,
    private store: Store<fromProducts.State>,
    private router: Router,
    private route: ActivatedRoute,
    private rootSidebarService: RootSidebarService
  ) {
    const actionsSubscription = route.params
      .pipe(map(params => ProductActions.searchProducts({ query: params.keyword })))
      .subscribe(action => store.dispatch(action));
    this.subscriptions.push(actionsSubscription);

    this.products$ = store.pipe(select(fromProducts.getSearchResults));
    this.loading$ = store.pipe(select(fromProducts.getSearchLoading));
    this.error$ = store.pipe(select(fromProducts.getSearchError));
  }

  ngOnInit() {
    this.sortOptions = [
      { label: 'Price', value: 'unitPrice' },
      { label: 'Top Sales', value: 'sellCount' },
      { label: 'Name', value: 'productName' }
    ];
  }

  public getFilters(products) {
    var uniqueColors = [];
    var itemColor = Array();

    var uniqueCategories = [];
    // var itemCategory = Array();
    const categoryMap = new Map();

    var minPrice: number = 0;
    var maxPrice: number = 0;

    products.map((product, index) => {

      if (index == 0) {
        minPrice = product.unitPrice;
        maxPrice = product.unitPrice;
      }

      if (product.color) {
        const index = uniqueColors.indexOf(product.color);
        if (index === -1) uniqueColors.push(product.color);
      }


      if (product.productSubCategory) {
        if (!categoryMap.has(product.productSubCategory.id)) {
          categoryMap.set(product.productSubCategory.id, true);
          uniqueCategories.push(product.productSubCategory);
        }
      }


      if (product.unitPrice) {
        if (product.unitPrice < minPrice) minPrice = product.unitPrice;
        if (product.unitPrice > maxPrice) maxPrice = product.unitPrice;
      }
    });

    //color
    for (var i = 0; i < uniqueColors.length; i++) {
      itemColor.push({ color: uniqueColors[i] })
    }
    this.colors = itemColor;

    console.log('colors', this.colors);


    console.log('categories', uniqueCategories);
    this.generateCategoriesTree(uniqueCategories);

    this.price = {
      'minPrice': minPrice,
      'maxPrice': maxPrice
    };

    this.rangePrice = [minPrice, maxPrice];
    console.log('price', this.price);
  }

  onSortChange(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    }
    else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  private generateCategoriesTree(subCategories) {
    const categories = [];
    const map = new Map();

    for (const item of subCategories) {
      const category = item.productCategory;
      if (!map.has(category.id)) {
        map.set(category.id, true);    // set any value to Map
        categories.push({
          id: category.id,
          label: category.productCategoryName,
          data: category.productCategoryName,
          type: "collapsable",
          expandedIcon: "fa fa-folder-open",
          children: []
        });
      }
    }

    for (const category of categories) {
      subCategories.map(item => {
        if (category.id == item.productCategory.id) {
          category.children.push({
            id: item.id,
            label: item.productSubCategoryName,
            data: item.productSubCategoryName,
            icon: "fa fa-file-word-o",
            type: "item",
            status: "A"
          })
        }
      })
    }

    console.log('category', categories)
    this.categoriesTree = categories;
  }

  updateCategories(categories: any[]) {
    const _filter = Array();
    categories.map((item, index) => {
      if (item.type == "item") {
        _filter.push(item.label);
      }
    });
    this.categoriesFilters = _filter;

    console.log('filter', this.categoriesFilters)
  }

  public updateColorFilters(colors: ColorFilter[]) {
    this.colorFilters = colors;
  }

  public updatePriceFilters(price: any) {
    const temp: any[] = [];
    this.filteredItems.filter((item: any) => {
      if (item.unitPrice >= price[0] && item.unitPricef <= price[1]) {
        temp.push(item);
      }
    });

    this.products = temp;
  }

  updateCondition(condition: any[]) {
    console.log(condition);
  }

  toggleSidebar(name): void {
    this.rootSidebarService.getSidebar(name).toggleOpen();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(el => {
      if (el) el.unsubscribe();
    });
  }
}
