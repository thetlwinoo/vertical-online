import { Component, OnInit, OnDestroy } from '@angular/core';
import { FetchActions, ProductHomeActions } from 'app/ngrx/products/actions';
import * as fromProducts from 'app/ngrx/products/reducers';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { IProducts, IProductCategory, IStockItems } from '@vertical/models';
import { Subject } from 'rxjs';
import { takeUntil, filter, map } from 'rxjs/operators';
import { StockItemsService } from '@vertical/services';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  // newlyAdded$: Observable<IProducts[]>;
  // newlyAdded: IProducts[];
  // mostSelling$: Observable<IProducts[]>;
  // interested$: Observable<IProducts[]>;
  // dailyDiscover$: Observable<IProducts[]>;
  bundles$: Observable<IProductCategory[]>;
  categoriesTree$: Observable<IProductCategory[]>;
  categoriesTreeLoading$: Observable<boolean>;
  // newlyAddedLoading$: Observable<boolean>;
  // mostSellingLoading$: Observable<boolean>;
  // interestedLoading$: Observable<boolean>;
  // dailyDiscoverLoading$: Observable<boolean>;
  error$: Observable<string>;
  bundles: IProductCategory[] = [];
  loading$: Observable<boolean>;

  productHome$: Observable<any>;
  productHome: any;

  private unsubscribeAll: Subject<any>;

  constructor(private store: Store<fromProducts.State>, protected stockItemsService: StockItemsService) {
    this.unsubscribeAll = new Subject();

    // this.newlyAdded$ = store.pipe(select(fromProducts.getFetchNewlyAdded));
    // this.mostSelling$ = store.pipe(select(fromProducts.getFetchMostSelling));
    // this.interested$ = store.pipe(select(fromProducts.getFetchInterested));
    // this.dailyDiscover$ = store.pipe(select(fromProducts.getFetchDailyDiscover));
    this.bundles$ = store.pipe(select(fromProducts.getFetchBundles));
    this.categoriesTree$ = store.pipe(select(fromProducts.getFetchCategoriesTree));
    this.categoriesTreeLoading$ = store.pipe(select(fromProducts.getFetchCategoriesTreeLoading));

    // this.newlyAddedLoading$ = store.pipe(select(fromProducts.getFetchNewlyAddedLoading));
    // this.mostSellingLoading$ = store.pipe(select(fromProducts.getFetchMostSellingLoading));
    // this.interestedLoading$ = store.pipe(select(fromProducts.getFetchInterestedLoading));
    // this.dailyDiscoverLoading$ = store.pipe(select(fromProducts.getFetchDailyDiscoverLoading));
    // this.error$ = store.pipe(takeUntil(this.unsubscribeAll), select(fromProducts.getFetchError));

    this.productHome$ = store.pipe(select(fromProducts.getProductHome));
    this.loading$ = store.pipe(select(fromProducts.getProductHomeLoading));
    this.error$ = store.pipe(takeUntil(this.unsubscribeAll), select(fromProducts.getProductHomeError));
  }

  ngOnInit(): void {
    // this.store.dispatch(FetchActions.fetchNewlyAdded());
    // this.store.dispatch(FetchActions.fetchMostSelling());
    // this.store.dispatch(FetchActions.fetchInterested());
    // this.store.dispatch(FetchActions.fetchDailyDiscover());
    // this.store.dispatch(FetchActions.fetchCategories());
    this.store.dispatch(FetchActions.fetchCategoriesTree());
    this.store.dispatch(ProductHomeActions.fetchProductsHome());

    this.productHome$.subscribe(payload => {
      this.productHome = payload;
      console.log('this.productHome', payload);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
