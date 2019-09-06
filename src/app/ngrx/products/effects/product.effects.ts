import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { asyncScheduler, EMPTY as empty, of } from 'rxjs';
import { catchError, debounceTime, map, skip, switchMap, takeUntil, filter } from 'rxjs/operators';
import { JhiParseLinks } from 'ng-jhipster';
import { IProducts } from '@root/models';
import { ProductActions } from '../actions';
import { ProductsService } from '@root/services';

@Injectable()
export class ProductEffects {
    searchWithNoPaging$ = createEffect(
        () => ({ debounce = 300, scheduler = asyncScheduler } = {}) =>
            this.actions$.pipe(
                ofType(ProductActions.searchProductsWithNoPaging),
                debounceTime(debounce, scheduler),
                switchMap(({ keyword }) => {
                    if (keyword === '') {
                        return empty;
                    }

                    const nextSearch$ = this.actions$.pipe(
                        ofType(ProductActions.searchProductsWithNoPaging),
                        skip(1)
                    );

                    return this.productsService.searchAll(keyword).pipe(
                        takeUntil(nextSearch$),
                        filter((res: HttpResponse<IProducts[]>) => res.ok),
                        map((res: HttpResponse<IProducts[]>) => {
                            const products: IProducts[] = res.body;
                            return ProductActions.searchWithNoPagingSuccess({ products })
                        }),
                        catchError(err =>
                            of(ProductActions.searchFailure({ errorMsg: err.message }))
                        )
                    );
                })
            )
    );

    searchWithPaging$ = createEffect(
        () => ({ debounce = 300, scheduler = asyncScheduler } = {}) =>
            this.actions$.pipe(
                ofType(ProductActions.searchProductsWithPaging),
                debounceTime(debounce, scheduler),
                switchMap(({ query }) => {
                    if (!query) {
                        return empty;
                    }

                    const nextSearch$ = this.actions$.pipe(
                        ofType(ProductActions.searchProductsWithPaging),
                        skip(1)
                    );

                    console.log('final query',query)
                    return this.productsService.search(query).pipe(
                        takeUntil(nextSearch$),
                        filter((res: HttpResponse<IProducts[]>) => res.ok),
                        map((res: HttpResponse<IProducts[]>) => {
                            const _payload = {
                                products: res.body,
                                links: this.parseLinks.parse(res.headers.get('link')),
                                totalItems: parseInt(res.headers.get('X-Total-Count'), 10)
                            }
                            return ProductActions.searchWithPagingSuccess({ payload: _payload })
                        }),
                        catchError(err =>
                            of(ProductActions.searchFailure({ errorMsg: err.message }))
                        )
                    );
                })
            )
    );

    constructor(
        private actions$: Actions,
        private productsService: ProductsService,
        protected parseLinks: JhiParseLinks
    ) { }
}