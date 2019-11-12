import { Component, OnInit } from '@angular/core';
import { FetchActions } from 'app/ngrx/products/actions';
import * as fromProducts from 'app/ngrx/products/reducers';
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { IProducts, IProductCategory } from '@epm/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  newlyAdded$: Observable<IProducts[]>;
  mostSelling$: Observable<IProducts[]>;
  interested$: Observable<IProducts[]>;
  dailyDiscover$: Observable<IProducts[]>;
  bundles$: Observable<any[]>;
  newlyAddedLoading$: Observable<boolean>;
  mostSellingLoading$: Observable<boolean>;
  interestedLoading$: Observable<boolean>;
  dailyDiscoverLoading$: Observable<boolean>;
  error$: Observable<string>;
  bundles: any[] = [];

  constructor(
    private store: Store<fromProducts.State>,
  ) {
    this.newlyAdded$ = store.pipe(select(fromProducts.getFetchNewlyAdded));
    this.mostSelling$ = store.pipe(select(fromProducts.getFetchMostSelling));
    this.interested$ = store.pipe(select(fromProducts.getFetchInterested));
    this.dailyDiscover$ = store.pipe(select(fromProducts.getFetchDailyDiscover));
    this.bundles$ = store.pipe(select(fromProducts.getFetchBundles));
    
    this.newlyAddedLoading$ = store.pipe(select(fromProducts.getFetchNewlyAddedLoading));
    this.mostSellingLoading$ = store.pipe(select(fromProducts.getFetchMostSellingLoading));
    this.interestedLoading$ = store.pipe(select(fromProducts.getFetchInterestedLoading));
    this.dailyDiscoverLoading$ = store.pipe(select(fromProducts.getFetchDailyDiscoverLoading));
    this.error$ = store.pipe(select(fromProducts.getFetchError));
  }

  ngOnInit() {
    this.store.dispatch(FetchActions.fetchNewlyAdded());
    this.store.dispatch(FetchActions.fetchMostSelling());
    this.store.dispatch(FetchActions.fetchInterested());
    this.store.dispatch(FetchActions.fetchDailyDiscover());
    this.store.dispatch(FetchActions.fetchCategories());
  }

}
