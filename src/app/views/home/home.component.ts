import { Component, OnInit, OnDestroy } from '@angular/core';
import { FetchActions } from 'app/ngrx/products/actions';
import { HomePageActions } from 'app/ngrx/web-sitemap/actions';
import * as fromProducts from 'app/ngrx/products/reducers';
import * as fromWebSitemap from 'app/ngrx/web-sitemap/reducers';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { IProductCategory } from '@vertical/models';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StockItemsService } from '@vertical/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  bundles$: Observable<IProductCategory[]>;
  categoriesTree$: Observable<IProductCategory[]>;
  categoriesTreeLoading$: Observable<boolean>;
  error$: Observable<string>;
  bundles: IProductCategory[] = [];
  loading$: Observable<boolean>;

  homePage$: Observable<any>;
  homePage: any;

  gridStyle = {
    width: '11.11%',
    textAlign: 'center',
  };

  private unsubscribe$: Subject<any> = new Subject();

  constructor(
    private store: Store<fromProducts.State>,
    private webSitemapStore: Store<fromWebSitemap.State>,
    protected stockItemsService: StockItemsService
  ) {
    this.categoriesTree$ = store.pipe(select(fromProducts.getFetchCategoriesTree));
    this.categoriesTreeLoading$ = store.pipe(select(fromProducts.getFetchCategoriesTreeLoading));

    this.bundles$ = webSitemapStore.pipe(select(fromWebSitemap.getFetchBundles));
    this.homePage$ = webSitemapStore.pipe(select(fromWebSitemap.getHomePage));
    this.loading$ = webSitemapStore.pipe(select(fromWebSitemap.getHomePageLoading));
    this.error$ = webSitemapStore.pipe(takeUntil(this.unsubscribe$), select(fromWebSitemap.getHomePageError));
  }

  ngOnInit(): void {
    this.store.dispatch(FetchActions.fetchCategoriesTree());
    this.webSitemapStore.dispatch(HomePageActions.fetchHomePage());

    this.homePage$.pipe(takeUntil(this.unsubscribe$)).subscribe(payload => {
      this.homePage = payload;
    });

    // this.categoriesTree$.subscribe(data => console.log(data));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
