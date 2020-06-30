import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { defer, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import { CompareActions, SelectedStockItemPageActions } from 'app/ngrx/products/actions';
import { IStockItems } from '@eps/models';
import { StockItemCompareStorageService } from '@eps/services';

@Injectable()
export class CompareEffects {
  checkStorageSupport$ = createEffect(() => defer(() => this.storageService.supported()), { dispatch: false });

  loadCompare$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompareActions.loadCompare),
      switchMap(() =>
        this.storageService.getCompare().pipe(
          map((stockItems: IStockItems[]) => CompareActions.loadStockItemsSuccess({ stockItems })),
          catchError(error => of(CompareActions.loadStockItemsFailure({ error })))
        )
      )
    )
  );

  addStockItemToCompare$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SelectedStockItemPageActions.addStockItemToCompare),
      mergeMap(({ stockItem }) =>
        this.storageService.addToCompare([stockItem]).pipe(
          mergeMap(() => [CompareActions.addStockItemSuccess({ stockItem }), CompareActions.loadCompare()]),
          catchError(() => of(CompareActions.addStockItemFailure({ stockItem })))
        )
      )
    )
  );

  removeStockItemFromCompare$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SelectedStockItemPageActions.removeStockItemFromCompare),
      mergeMap(({ stockItem }) =>
        this.storageService.removeFromCompare([stockItem.id]).pipe(
          mergeMap(() => [CompareActions.removeStockItemSuccess({ stockItem }), CompareActions.loadCompare()]),
          catchError(() => of(CompareActions.removeStockItemFailure({ stockItem })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private storageService: StockItemCompareStorageService) {}
}
