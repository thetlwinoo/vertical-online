import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { map, takeUntil, zip } from 'rxjs/operators';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { IProducts, IProductCategory } from '@eps/models';
import { RootSidebarService } from '@eps/components/sidebar/sidebar.service';
import { Store, select } from '@ngrx/store';
import _ from 'lodash';
import { ProductActions, FetchActions } from 'app/ngrx/products/actions';
import * as fromProducts from 'app/ngrx/products/reducers';
import * as fromTags from 'app/ngrx/tags/reducers';

import { ITEMS_PER_PAGE } from '@eps/constants';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit, OnDestroy {
  keyword: string = null;
  category: string = null;
  // selectedCategories: any = null;
  selectedColors: string[] = [];
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
  public dataViewOptions = {
    loading: true,
    layout: 'grid',
  };
  // public minPrice: number;
  // public maxPrice: number;

  products: any[] = [];
  products$: Observable<IProducts[]>;
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
  private unsubscribeAll: Subject<any> = new Subject();

  constructor(
    private store: Store<fromProducts.State>,
    private tagStore: Store<fromTags.State>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    protected parseLinks: JhiParseLinks,
    private rootSidebarService: RootSidebarService,
    protected eventManager: JhiEventManager
  ) {
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.categoriesIds$ = tagStore.pipe(select(fromTags.getCategoriesIds));

    this.activatedRoute.params
      .pipe(
        takeUntil(this.unsubscribeAll),
        zip(this.activatedRoute.data, this.activatedRoute.queryParams),
        map(payload => {
          const params = payload[0];
          const data = payload[1];
          const queryParams = payload[2];

          this.page = data.pagingParams.page;
          this.previousPage = data.pagingParams.page;
          this.reverse = data.pagingParams.ascending;
          this.predicate = data.pagingParams.predicate;

          this.keyword = params.keyword || '';
          this.category = queryParams.category || '';
          if (this.category) {
            this.categoriesIds.push(+this.category);
          }

          return ProductActions.searchProductsWithPaging({ query: this.getQuery() });
        })
      )
      .subscribe(action => store.dispatch(action));

    this.products$ = store.pipe(select(fromProducts.getSearchResults));
    this.links$ = store.pipe(select(fromProducts.getSearchLinks));
    this.currentCategory$ = tagStore.pipe(select(fromTags.getSelectedCategory));
    this.totalItems$ = store.pipe(select(fromProducts.getSearchTotalItems));
    this.loading$ = store.pipe(select(fromProducts.getSearchLoading));
    this.error$ = store.pipe(select(fromProducts.getSearchError));
  }

  ngOnInit(): void {
    this.categoriesIds$.pipe(takeUntil(this.unsubscribeAll)).subscribe(ids => {
      this.categoriesIds = ids;
    });

    this.registerChangeInProducts();
  }

  loadAll(): void {
    this.store.dispatch(ProductActions.searchProductsWithPaging({ query: this.getQuery() }));
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
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort(),
    };

    if (this.keyword && this.keyword !== '_blank') {
      _.assign(this.query, { 'searchDetails.contains': this.keyword });
    }

    // if (this.selectedCategories) {
    //   switch (this.selectedCategories.type) {
    //     case 'item':
    //       _.assign(this.query, { 'productCategoryId.equals': this.selectedCategories.id });
    //       break;
    //     case 'collapsable':
    //       if (this.selectedCategories.children.length) {
    //         _.assign(this.query, { 'productCategoryId.in': this.selectedCategories.children.map(item => item.id) });
    //       }
    //       break;
    //   }
    // }
    if (this.categoriesIds.length > 0) {
      _.assign(this.query, { 'productCategoryId.in': this.categoriesIds });
    }

    if (this.selectedColors.length) {
      _.assign(this.query, { 'color.in': this.selectedColors });
    }

    if (this.selectedPriceRange.length) {
      _.assign(this.query, {
        'defaultUnitPrice.greaterOrEqualThan': this.selectedPriceRange[0],
        'defaultUnitPrice.lessThan': this.selectedPriceRange[1],
      });
    }

    return this.query;
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
    const paging = {
      page: this.page,
      size: this.itemsPerPage,
      sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc'),
    };

    if (this.category) {
      _.assign(paging, { category: this.category });
    }

    this.router.navigate(['/search/', this.keyword], {
      queryParams: paging,
    });
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

  public onSelectedColors(colors: any): void {
    this.page = 1;
    this.selectedColors = colors;
    this.transition();
  }

  public onSelectedPriceRange(price: any): void {
    console.log('price changed', price);
    this.page = 1;
    this.selectedPriceRange = price;
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
