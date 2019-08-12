import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';

import * as ShowcaseActions from "./showcase.actions";
import { ProductService } from "@root/services";

@Injectable()
export class ShowcaseEffects {

  @Effect()
  fetchNewlyAdded = this.actions$.pipe(
    ofType(ShowcaseActions.FETCH_NEWLY_ADDED),
    switchMap((action: ShowcaseActions.FetchNewlyAdded) => this.productService.getNewlyAdded()
      .map(res => ({ type: ShowcaseActions.FETCH_NEWLY_ADDED_SUCCESS, payload: res }))
    )
  )

  @Effect()
  fetchMostSelling = this.actions$.pipe(
    ofType(ShowcaseActions.FETCH_MOST_SELLING),
    switchMap((action: ShowcaseActions.FetchMostSelling) => this.productService.getMostSelling()
      .map(res => ({ type: ShowcaseActions.FETCH_MOST_SELLING_SUCCESS, payload: res }))
    )
  )

  @Effect()
  fetchInterested = this.actions$.pipe(
    ofType(ShowcaseActions.FETCH_INTERESTED),
    switchMap((action: ShowcaseActions.FetchInterested) => this.productService.getInterested()
      .map(res => ({ type: ShowcaseActions.FETCH_INTERESTED_SUCCESS, payload: res }))
    )
  )

  @Effect()
  FetchDailyDiscover = this.actions$.pipe(
    ofType(ShowcaseActions.FETCH_DAILY_DISCOVER),
    switchMap((action: ShowcaseActions.FetchDailyDiscover) => this.productService.getDailyDiscover()
      .map(res => ({ type: ShowcaseActions.FETCH_DAILY_DISCOVER_SUCCESS, payload: res }))
    )
  )

  constructor(private actions$: Actions, private productService: ProductService) {
  }
}
