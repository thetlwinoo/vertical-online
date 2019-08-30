import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Observable, Subject, Subscription } from "rxjs";
import { map, takeUntil, zip } from 'rxjs/operators';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { ColorFilter, IProducts, IProductCategory } from '@root/models';
import { TreeNode, SelectItem } from 'primeng/api';
import { RootSidebarService } from '@root/components/sidebar/sidebar.service';
import { Store, select } from "@ngrx/store";

import { ProductActions, FetchActions } from 'app/ngrx/products/actions';
import * as fromProducts from 'app/ngrx/products/reducers';

import { ITEMS_PER_PAGE } from '@root/constants';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any>;
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
  // categories$: Observable<IProductCategory[]>;
  links$: Observable<any>;
  categoriesFilter$: Observable<any>;
  totalItems$: Observable<any>;
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

  eventSubscriber: Subscription;
  // routeData: any;
  links: any;
  totalItems: any;
  itemsPerPage: any;
  page: any;
  predicate: any;
  previousPage: any;
  reverse: any;

  constructor(
    private store: Store<fromProducts.State>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    protected parseLinks: JhiParseLinks,
    private rootSidebarService: RootSidebarService,
    protected eventManager: JhiEventManager
  ) {
    this._unsubscribeAll = new Subject();

    this.activatedRoute.params
      .pipe(
        takeUntil(this._unsubscribeAll),
        zip(this.activatedRoute.data),
        map((payload) => {
          const params = payload[0];
          const data = payload[1];

          this.page = data.pagingParams.page;
          this.previousPage = data.pagingParams.page;
          this.reverse = data.pagingParams.ascending;
          this.predicate = data.pagingParams.predicate;
          this.keyword = params.keyword;

          return ProductActions.searchProductsWithPaging({
            query: {
              page: this.page - 1,
              size: this.itemsPerPage,
              sort: this.sort(),
              'productName.contains': params.keyword,
              keyword: params.keyword
            }
          });
        })
      )
      .subscribe(action => store.dispatch(action));

    this.itemsPerPage = ITEMS_PER_PAGE;

    this.products$ = store.pipe(select(fromProducts.getSearchResults));
    // this.categories$ = store.pipe(select(fromProducts.getFetchCategories));
    this.links$ = store.pipe(select(fromProducts.getSearchLinks));
    this.categoriesFilter$ = store.pipe(select(fromProducts.getSearchCategoriesFilters));
    this.totalItems$ = store.pipe(select(fromProducts.getSearchTotalItems));
    this.loading$ = store.pipe(select(fromProducts.getSearchLoading));
    this.error$ = store.pipe(select(fromProducts.getSearchError));

    this.categoriesFilter$.subscribe(filter=> console.log('cag filter',filter))
  }

  ngOnInit() {
    // this.store.dispatch(FetchActions.fetchCategories());
    this.registerChangeInProducts();
  }

  loadAll() {
    this.store.dispatch(ProductActions.searchProductsWithPaging({
      query: {
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
        'productName.contains': this.keyword
      }
    }));
  }

  trackId(index: number, item: IProducts) {
    return item.id;
  }

  registerChangeInProducts() {
    this.eventSubscriber = this.eventManager.subscribe('productsListModification', response => this.loadAll());
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  transition() {
    this.router.navigate(['/search/', this.keyword], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    });
  }

  // public getFilters(products) {
  //   var uniqueColors = [];
  //   var itemColor = Array();

  //   var uniqueCategories = [];
  //   // var itemCategory = Array();
  //   const categoryMap = new Map();

  //   var minPrice: number = 0;
  //   var maxPrice: number = 0;

  //   products.map((product, index) => {

  //     if (index == 0) {
  //       minPrice = product.unitPrice;
  //       maxPrice = product.unitPrice;
  //     }

  //     if (product.color) {
  //       const index = uniqueColors.indexOf(product.color);
  //       if (index === -1) uniqueColors.push(product.color);
  //     }


  //     if (product.productSubCategory) {
  //       if (!categoryMap.has(product.productSubCategory.id)) {
  //         categoryMap.set(product.productSubCategory.id, true);
  //         uniqueCategories.push(product.productSubCategory);
  //       }
  //     }


  //     if (product.unitPrice) {
  //       if (product.unitPrice < minPrice) minPrice = product.unitPrice;
  //       if (product.unitPrice > maxPrice) maxPrice = product.unitPrice;
  //     }
  //   });

  //   //color
  //   for (var i = 0; i < uniqueColors.length; i++) {
  //     itemColor.push({ color: uniqueColors[i] })
  //   }
  //   this.colors = itemColor;

  //   console.log('colors', this.colors);


  //   console.log('categories', uniqueCategories);
  //   this.generateCategoriesTree(uniqueCategories);

  //   this.price = {
  //     'minPrice': minPrice,
  //     'maxPrice': maxPrice
  //   };

  //   this.rangePrice = [minPrice, maxPrice];
  //   console.log('price', this.price);
  // }

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
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
