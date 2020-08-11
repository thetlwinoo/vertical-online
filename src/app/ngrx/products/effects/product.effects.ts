import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { asyncScheduler, EMPTY as empty, of } from 'rxjs';
import { catchError, debounceTime, map, skip, switchMap, takeUntil, filter, mergeMap } from 'rxjs/operators';
import { JhiParseLinks } from 'ng-jhipster';
import { IProducts } from '@eps/models';
import { ProductActions } from '../actions';
import { ProductsService } from '@eps/services';

@Injectable()
export class ProductEffects {
  searchWithNoPaging$ = createEffect(() => ({ debounce = 300, scheduler = asyncScheduler } = {}) =>
    this.actions$.pipe(
      ofType(ProductActions.searchProductsWithNoPaging),
      debounceTime(debounce, scheduler),
      switchMap(({ keyword }) => {
        if (keyword === '') {
          return empty;
        }

        const nextSearch$ = this.actions$.pipe(ofType(ProductActions.searchProductsWithNoPaging), skip(1));

        return this.productsService.searchAll(keyword).pipe(
          takeUntil(nextSearch$),
          filter((res: HttpResponse<IProducts[]>) => res.ok),
          map((res: HttpResponse<IProducts[]>) => {
            res.body.map(item => {
              item.productDetails = JSON.parse(item.productDetails);
            });

            return ProductActions.searchWithNoPagingSuccess({ products: res.body });
          }),
          catchError(err => of(ProductActions.searchFailure({ errorMsg: err.message })))
        );
      })
    )
  );

  searchWithPaging$ = createEffect(() => ({ debounce = 300, scheduler = asyncScheduler } = {}) =>
    this.actions$.pipe(
      ofType(ProductActions.searchProductsWithPaging),
      debounceTime(debounce, scheduler),
      switchMap(({ query }) => {
        if (!query) {
          return empty;
        }

        const nextSearch$ = this.actions$.pipe(ofType(ProductActions.searchProductsWithPaging), skip(1));

        return this.productsService.search(query).pipe(
          takeUntil(nextSearch$),
          filter((res: HttpResponse<IProducts[]>) => res.ok),
          map((res: HttpResponse<IProducts[]>) => {
            res.body.map(item => {
              item.productDetails = JSON.parse(item.productDetails);
            });

            const _payload = {
              products: res.body,
              links: this.parseLinks.parse(res.headers.get('link')),
              totalItems: parseInt(res.headers.get('X-Total-Count'), 10),
            };
            return ProductActions.searchWithPagingSuccess({ payload: _payload });
          }),
          catchError(err => of(ProductActions.searchFailure({ errorMsg: err.message })))
        );
      })
    )
  );

  filterProducts$ = createEffect(() => () =>
    this.actions$.pipe(
      ofType(ProductActions.filterProducts),
      switchMap(({ query }) => {
        if (!query) {
          return empty;
        }

        return this.productsService.filterProducts(query).pipe(
          filter((res: HttpResponse<any>) => res.ok),
          map((res: HttpResponse<any>) => ProductActions.filterProductsSuccess({ payload: res.body })),
          catchError(error => of(ProductActions.searchFailure({ errorMsg: error.message })))
        );
      })
    )
  );

  filterControllers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.filterControllers),
      mergeMap(({ query }) =>
        this.productsService.filterControllers(query).pipe(
          filter((res: HttpResponse<any>) => res.ok),
          map((res: HttpResponse<any>) => ProductActions.filterControllersSuccess({ payload: res.body })),
          catchError(error => of(ProductActions.searchFailure({ errorMsg: error.message })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private productsService: ProductsService, protected parseLinks: JhiParseLinks) {}
}
