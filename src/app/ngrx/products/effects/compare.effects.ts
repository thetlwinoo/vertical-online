import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { defer, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import {
    CompareActions,
    SelectedProductPageActions,
} from 'app/ngrx/products/actions';
import { IProducts } from '@epm/models';
import { ProductCompareStorageService } from '@epm/services/core';

@Injectable()
export class CompareEffects {
    checkStorageSupport$ = createEffect(
        () => defer(() => this.storageService.supported()),
        { dispatch: false }
    );

    loadCompare$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CompareActions.loadCompare),
            switchMap(() =>
                this.storageService.getCompare().pipe(
                    map((products: IProducts[]) =>
                        CompareActions.loadProductsSuccess({ products })
                    ),
                    catchError(error =>
                        of(CompareActions.loadProductsFailure({ error }))
                    )
                )
            )
        )
    );

    addProductToCompare$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SelectedProductPageActions.addProductToCompare),
            mergeMap(({ product }) =>
                this.storageService.addToCompare([product]).pipe(
                    map(() => CompareActions.addProductSuccess({ product })),
                    catchError(() => of(CompareActions.addProductFailure({ product })))
                )
            )
        )
    );

    removeProductFromCompare$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SelectedProductPageActions.removeProductFromCompare),
            mergeMap(({ product }) =>
                this.storageService.removeFromCompare([product.id]).pipe(
                    map(() => CompareActions.removeProductSuccess({ product })),
                    catchError(() => of(CompareActions.removeProductFailure({ product })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private storageService: ProductCompareStorageService
    ) { }
}