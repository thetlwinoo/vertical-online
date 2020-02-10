import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { defer, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, filter } from 'rxjs/operators';

import {
    WishlistActions,
    SelectedProductPageActions,
} from 'app/ngrx/products/actions';
import { IProducts } from '@eps/models';
import { WishlistService } from '@eps/services';

@Injectable()
export class WishlistEffects {
    loadWishlist$ = createEffect(() =>
        this.actions$.pipe(
            ofType(WishlistActions.loadWishlist),
            switchMap(() =>
                this.wishlistService.fetchWishlistProducts().pipe(
                    filter((res: HttpResponse<IProducts[]>) => res.ok),
                    map((res: HttpResponse<IProducts[]>) =>
                        WishlistActions.loadProductsSuccess({ products: res.body })
                    ),
                    catchError(error =>
                        of(WishlistActions.loadProductsFailure({ error }))
                    )
                )
            )
        )
    );

    addProductToWishlist$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SelectedProductPageActions.addProductToWishlist),
            mergeMap(({ product }) =>
                this.wishlistService.addToWishlist(product.id).pipe(
                    map(() => WishlistActions.addProductSuccess({ product })),
                    catchError(() => of(WishlistActions.addProductFailure({ product })))
                )
            )
        )
    );

    removeProductFromWishlist$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SelectedProductPageActions.removeProductFromWishlist),
            mergeMap(({ product }) =>
                this.wishlistService.removeFromWishlist(product.id).pipe(
                    map(() => WishlistActions.removeProductSuccess({ product })),
                    catchError(() => of(WishlistActions.removeProductFailure({ product })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private wishlistService: WishlistService
    ) { }
}