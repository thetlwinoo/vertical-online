import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { map, takeUntil, zip, filter } from 'rxjs/operators';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { IProducts, IProductCategory, ISuppliers } from '@vertical/models';
import { RootSidebarService } from '@vertical/components/sidebar/sidebar.service';
import { Store, select } from '@ngrx/store';
import _ from 'lodash';
import { ProductActions, FetchActions } from 'app/ngrx/products/actions';
import * as fromProducts from 'app/ngrx/products/reducers';
import * as fromTags from 'app/ngrx/tags/reducers';

import { ITEMS_PER_PAGE, SERVER_API_URL } from '@vertical/constants';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ProductFilterProps } from '@vertical/models/product-actions.model';
import { SuppliersService } from '@vertical/services/e-commerce/suppliers.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit, OnDestroy {
  keyword: string = null;
  categoryId: number = null;
  brandId: number = null;
  supplierId: number = null;
  suppliers: ISuppliers;
  // selectedCategories: any = null;
  selectedAttributes: string[] = [];
  selectedOptions: string[] = [];
  selectedBrands: number[] = [];
  selectedPriceRange: number[] = [];
  subCategoryIds: number[];
  canFetch = false;
  // querySubscribe: Subscription;
  public categories: any[] = [];
  public categoriesTree: any;
  public colors: any[] = [];
  public price: any;
  public rangePrice: any = [0, 0];

  public filteredItems: any[] = [];
  public colorFilters: any[] = [];
  public categoriesFilters: any[] = [];
  public priceFilters: any[] = [];
  public rating: number;
  public dataViewOptions = {
    loading: true,
    layout: 'grid',
  };
  // public minPrice: number;
  // public maxPrice: number;

  products: any[] = [];
  products$: Observable<IProducts[]>;
  filteredResult$: Observable<any>;
  filteredResult: any;
  filterControllers$: Observable<any>;
  filterControllers: any;
  links$: Observable<any>;
  currentCategory$: Observable<string[]>;
  totalItems$: Observable<any>;
  categoriesIds$: Observable<number[]>;
  categoriesIds: number[] = [];
  loading$: Observable<boolean>;
  error$: Observable<string>;

  // sortOptions: SelectItem[];
  sortKey: string;
  sortField: string;
  sortOrder: number;
  loading: boolean;
  totalRecords = 1000;

  eventSubscriber: Subscription;
  // routeData: any;
  links: any;
  totalItems: any;
  itemsPerPage: any;
  page: any;
  predicate: any;
  previousPage: any;
  reverse: any;

  query: any;
  filter: ProductFilterProps;

  public blobUrl = SERVER_API_URL + 'services/cloudblob/api/images-extend/';

  private unsubscribeAll: Subject<any> = new Subject();

  constructor(
    private store: Store<fromProducts.State>,
    private tagStore: Store<fromTags.State>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    protected parseLinks: JhiParseLinks,
    private rootSidebarService: RootSidebarService,
    private suppliersService: SuppliersService,
    protected eventManager: JhiEventManager
  ) {
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.categoriesIds$ = tagStore.pipe(select(fromTags.getCategoriesIds));

    this.activatedRoute.queryParams
      .pipe(
        takeUntil(this.unsubscribeAll),
        map(payload => {
          console.log('payload', payload);
          this.keyword = payload.keyword || null;
          this.categoryId = payload.categoryId || null;
          this.brandId = payload.brandId || null;
          this.supplierId = payload.supplierId || null;

          if (this.supplierId) {
            this.suppliersService
              .find(this.supplierId)
              .pipe(
                takeUntil(this.unsubscribeAll),
                filter((res: HttpResponse<ISuppliers>) => res.ok),
                map((res: HttpResponse<ISuppliers>) => res.body)
              )
              .subscribe(data => (this.suppliers = data));
          }

          this.resetQuery();

          this.store.dispatch(ProductActions.filterControllers({ query: this.getQuery() }));
          return ProductActions.filterProducts({ query: this.getQuery() });
        })
      )
      .subscribe(action => store.dispatch(action));
    // this.activatedRoute.params
    //   .pipe(
    //     takeUntil(this.unsubscribeAll),
    //     zip(this.activatedRoute.data, this.activatedRoute.queryParams),
    //     map(payload => {
    //       const params = payload[0];
    //       const data = payload[1];
    //       const queryParams = payload[2];

    //       this.page = data.pagingParams.page;
    //       this.previousPage = data.pagingParams.page;
    //       this.reverse = data.pagingParams.ascending;
    //       this.predicate = data.pagingParams.predicate;

    //       this.keyword = params.keyword || '';
    //       this.category = queryParams.category || '';
    //       if (this.category) {
    //         this.categoriesIds.push(+this.category);
    //       }

    //       return ProductActions.searchProductsWithPaging({ query: this.getQuery() });
    //     })
    //   )
    //   .subscribe(action => store.dispatch(action));

    this.products$ = store.pipe(select(fromProducts.getSearchResults));
    this.links$ = store.pipe(select(fromProducts.getSearchLinks));
    this.currentCategory$ = tagStore.pipe(select(fromTags.getSelectedCategory));
    this.totalItems$ = store.pipe(select(fromProducts.getSearchTotalItems));
    this.loading$ = store.pipe(select(fromProducts.getSearchLoading));
    this.filteredResult$ = store.pipe(select(fromProducts.getFilteredResult));
    this.filterControllers$ = store.pipe(select(fromProducts.getFilterControllers));
    this.error$ = store.pipe(select(fromProducts.getSearchError));
  }

  ngOnInit(): void {
    this.categoriesIds$.pipe(takeUntil(this.unsubscribeAll)).subscribe(ids => {
      this.categoriesIds = ids;
    });

    this.filteredResult$.pipe(takeUntil(this.unsubscribeAll)).subscribe(result => (this.filteredResult = result));
    this.filterControllers$.pipe(takeUntil(this.unsubscribeAll)).subscribe(result => {
      console.log('result', result);
      this.filterControllers = result;

      if (result && result.relatedCategory && result.relatedCategory.length > 0) {
        this.categories = [];
        result.relatedCategory.map(item => {
          const cagItem = {
            key: item.key,
            title: item.title,
            expandedIcon: item.expandedIcon,
            expanded: item.expanded,
            children: [],
          };

          item.children.map(x => {
            cagItem.children.push({
              key: x.key,
              title: x.title,
              icon: x.icon,
              isLeaf: x.isLeaf,
            });
          });

          this.categories.push(cagItem);
        });
      }
    });
    this.registerChangeInProducts();
  }

  loadAll(): void {
    this.query = {
      page: this.page,
      size: this.itemsPerPage,
      sort: this.sort(),
    };

    this.store.dispatch(ProductActions.filterProducts({ query: this.getQuery() }));
  }

  trackId(index: number, item: IProducts): number {
    return item.id;
  }

  registerChangeInProducts(): void {
    this.eventSubscriber = this.eventManager.subscribe('productsListModification', response => this.loadAll());
  }

  searchText(): string {
    return this.keyword && this.keyword !== '_blank' ? this.keyword : null;
  }

  getQuery(): any {
    this.query = {
      page: this.page,
      size: this.itemsPerPage,
      sort: this.sort(),
    };

    if (this.keyword) {
      _.assign(this.query, { tag: this.keyword });
    }

    if (this.categoryId) {
      _.assign(this.query, { categoryId: this.categoryId });
    }

    if (this.brandId) {
      _.assign(this.query, { brandId: this.brandId });
    }

    if (this.supplierId) {
      _.assign(this.query, { supplierId: this.supplierId });
    }

    if (this.selectedBrands.length > 0) {
      _.assign(this.query, { brandIdList: this.selectedBrands });
    }

    if (this.selectedAttributes.length > 0) {
      _.assign(this.query, { attributes: this.selectedAttributes });
    }

    if (this.selectedOptions.length > 0) {
      _.assign(this.query, { options: this.selectedOptions });
    }

    if (this.selectedPriceRange.length > 0) {
      _.assign(this.query, { priceRange: this.selectedPriceRange });
    }

    if (this.rating > 0) {
      _.assign(this.query, { rating: this.rating });
    }

    console.log('query', this.query);
    return this.query;
  }

  resetQuery(): void {
    this.page = 1;
    this.selectedBrands = [];
    this.selectedAttributes = [];
    this.selectedOptions = [];
    this.selectedPriceRange = [];
    this.rating = null;
  }

  clearFilters(): void {
    this.resetQuery();
    this.store.dispatch(ProductActions.filterControllers({ query: this.getQuery() }));
    this.transition();
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  loadPage(page: number): void {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  pageIndexChanged(pageIndex): void {
    this.loading = true;
    // this.itemsPerPage = pageSize;
    this.page = pageIndex;
    this.loadPage(this.page);
  }

  transition(): void {
    this.loadAll();
  }

  onSortChange(event): void {
    const value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  // onSelectedCategories(item: any): void {
  //   this.page = 1;
  //   this.selectedCategories = item;
  //   this.transition();
  // }

  public onSelectedBrands(brands: number[]): void {
    this.page = 1;
    this.selectedBrands = brands;
    this.transition();
  }

  public onSelectedAttributes(attributes: any): void {
    this.page = 1;
    this.selectedAttributes = attributes;
    this.transition();
  }

  public onSelectedOptions(options: any): void {
    this.page = 1;
    this.selectedOptions = options;
    this.transition();
  }

  public onSelectedPriceRange(price: any): void {
    this.page = 1;
    this.selectedPriceRange = price;
    this.transition();
  }

  public onChangeRating(rating: number): void {
    this.page = 1;
    this.rating = rating;
    this.transition();
  }

  updateCondition(condition: any[]): void {
    console.log(condition);
  }

  toggleSidebar(name): void {
    this.rootSidebarService.getSidebar(name).toggleOpen();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
