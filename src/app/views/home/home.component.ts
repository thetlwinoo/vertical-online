import { Component, OnInit } from '@angular/core';
import { FetchActions } from 'app/ngrx/products/actions';
import * as fromProducts from 'app/ngrx/products/reducers';
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { IProducts } from '@root/models';

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
  loading$: Observable<boolean>;
  error$: Observable<string>;

  constructor(
    private store: Store<fromProducts.State>,
  ) {
    this.newlyAdded$ = store.pipe(select(fromProducts.getFetchNewlyAdded));
    this.mostSelling$ = store.pipe(select(fromProducts.getFetchMostSelling));
    this.interested$ = store.pipe(select(fromProducts.getFetchInterested));
    this.dailyDiscover$ = store.pipe(select(fromProducts.getFetchDailyDiscover));
    this.loading$ = store.pipe(select(fromProducts.getFetchLoading));
    this.error$ = store.pipe(select(fromProducts.getFetchError));
  }

  ngOnInit() {
    this.store.dispatch(FetchActions.fetchNewlyAdded());
    this.store.dispatch(FetchActions.fetchMostSelling());
    this.store.dispatch(FetchActions.fetchInterested());
    this.store.dispatch(FetchActions.fetchDailyDiscover());
  }

}
