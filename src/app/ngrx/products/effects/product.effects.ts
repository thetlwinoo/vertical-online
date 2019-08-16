import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { asyncScheduler, EMPTY as empty, of } from 'rxjs';
import { catchError, debounceTime, map, skip, switchMap, takeUntil, filter } from 'rxjs/operators';
import { IProducts } from '@root/models';
import { ProductActions } from '../actions';
import { ProductsService } from '@root/services';

@Injectable()
export class ProductEffects {
    search$ = createEffect(
        () => ({ debounce = 300, scheduler = asyncScheduler } = {}) =>
            this.actions$.pipe(
                ofType(ProductActions.searchProducts),
                // debounceTime(debounce, scheduler),
                switchMap(({ query }) => {
                    if (query === '') {
                        return empty;
                    }

                    const nextSearch$ = this.actions$.pipe(
                        ofType(ProductActions.searchProducts),
                        skip(1)
                    );

                    return this.productsService.searchProductAll(query).pipe(
                        takeUntil(nextSearch$),
                        filter((res: HttpResponse<IProducts[]>) => res.ok),
                        map((res: HttpResponse<IProducts[]>) => {
                            const products: IProducts[] = res.body;
                            return ProductActions.searchSuccess({ products })
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
        private productsService: ProductsService
    ) { }
}