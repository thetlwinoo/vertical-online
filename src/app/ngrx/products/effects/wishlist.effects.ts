import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { defer, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, filter } from 'rxjs/operators';

import { WishlistActions, SelectedStockItemPageActions } from 'app/ngrx/products/actions';
import { IStockItems } from '@vertical/models';
import { WishlistService } from '@vertical/services';

@Injectable()
export class WishlistEffects {
  loadWishlist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WishlistActions.loadWishlist),
      switchMap(() =>
        this.wishlistService.fetchWishlistStockItems().pipe(
          filter((res: HttpResponse<IStockItems[]>) => res.ok),
          map((res: HttpResponse<IStockItems[]>) => WishlistActions.loadStockItemsSuccess({ stockItems: res.body })),
          catchError(error => of(WishlistActions.loadStockItemsFailure({ error })))
        )
      )
    )
  );

  addStockItemToWishlist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SelectedStockItemPageActions.addStockItemToWishlist),
      mergeMap(({ stockItem }) =>
        this.wishlistService.addToWishlist(stockItem.id).pipe(
          switchMap(() => [WishlistActions.addStockItemSuccess({ stockItem }), WishlistActions.loadWishlist()]),
          catchError(() => of(WishlistActions.addStockItemFailure({ stockItem })))
        )
      )
    )
  );

  removeStockItemFromWishlist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SelectedStockItemPageActions.removeStockItemFromWishlist),
      mergeMap(({ stockItem }) =>
        this.wishlistService.removeFromWishlist(stockItem.id).pipe(
          switchMap(() => [WishlistActions.removeStockItemSuccess({ stockItem }), WishlistActions.loadWishlist()]),
          catchError(() => of(WishlistActions.removeStockItemFailure({ stockItem })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private wishlistService: WishlistService) {}
}
