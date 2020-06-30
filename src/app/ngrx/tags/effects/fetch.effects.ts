import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { asyncScheduler, EMPTY as empty, of } from 'rxjs';
import { catchError, debounceTime, map, skip, switchMap, takeUntil, filter } from 'rxjs/operators';
import { IProductCategory } from '@eps/models';
import { FetchActions } from '../actions';
import { ProductsService } from '@eps/services';

@Injectable()
export class FetchEffects {
  fetchSubCategoriesByTag$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FetchActions.fetchCategoriesByTag),
      switchMap(({ query }) =>
        this.productsService.relatedCategories(query.keyword, query.category).pipe(
          filter((res: HttpResponse<IProductCategory[]>) => res.ok),
          map((res: HttpResponse<IProductCategory[]>) => FetchActions.fetchCategoriesByTagSuccess({ categories: res.body })),
          catchError(err => of(FetchActions.fetchFailure({ errorMsg: err.message })))
        )
      )
    )
  );

  fetchColorsByTag$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FetchActions.fetchColorsByTag),
      switchMap(({ query }) =>
        this.productsService.relatedColors(query.keyword, query.category).pipe(
          filter((res: HttpResponse<string[]>) => res.ok),
          map((res: HttpResponse<string[]>) => FetchActions.fetchColorsByTagSuccess({ colors: res.body })),
          catchError(err => of(FetchActions.fetchFailure({ errorMsg: err.message })))
        )
      )
    )
  );

  fetchBrandsByTag$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FetchActions.fetchBrandsByTag),
      switchMap(({ query }) =>
        this.productsService.relatedBrands(query.keyword, query.category).pipe(
          filter((res: HttpResponse<string[]>) => res.ok),
          map((res: HttpResponse<string[]>) => FetchActions.fetchBrandsByTagSuccess({ brands: res.body })),
          catchError(err => of(FetchActions.fetchFailure({ errorMsg: err.message })))
        )
      )
    )
  );

  fetchPriceRangeByTag$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FetchActions.fetchPriceRangeByTag),
      switchMap(({ query }) =>
        this.productsService.relatedPriceRange(query.keyword, query.category).pipe(
          filter((res: HttpResponse<number[]>) => res.ok),
          map((res: HttpResponse<number[]>) => FetchActions.fetchPriceRangeByTagSuccess({ priceRange: res.body })),
          catchError(err => of(FetchActions.fetchFailure({ errorMsg: err.message })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private productsService: ProductsService) {}
}
