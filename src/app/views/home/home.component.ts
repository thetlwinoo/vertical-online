import { Component, OnInit, OnDestroy } from '@angular/core';
import { FetchActions, ProductHomeActions } from 'app/ngrx/products/actions';
import * as fromProducts from 'app/ngrx/products/reducers';
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

  productHome$: Observable<any>;
  productHome: any;

  private unsubscribe$: Subject<any> = new Subject();

  constructor(private store: Store<fromProducts.State>, protected stockItemsService: StockItemsService) {
    this.bundles$ = store.pipe(select(fromProducts.getFetchBundles));
    this.categoriesTree$ = store.pipe(select(fromProducts.getFetchCategoriesTree));
    this.categoriesTreeLoading$ = store.pipe(select(fromProducts.getFetchCategoriesTreeLoading));
    this.productHome$ = store.pipe(select(fromProducts.getProductHome));
    this.loading$ = store.pipe(select(fromProducts.getProductHomeLoading));
    this.error$ = store.pipe(takeUntil(this.unsubscribe$), select(fromProducts.getProductHomeError));
  }

  ngOnInit(): void {
    this.store.dispatch(FetchActions.fetchCategoriesTree());
    this.store.dispatch(ProductHomeActions.fetchProductsHome());

    this.productHome$.pipe(takeUntil(this.unsubscribe$)).subscribe(payload => {
      this.productHome = payload;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
