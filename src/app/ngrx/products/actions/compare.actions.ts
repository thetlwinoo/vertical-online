import { createAction, props } from '@ngrx/store';

import { IStockItems } from '@eps/models';

export const addStockItemSuccess = createAction('[Compare/API] Add StockItem Success', props<{ stockItem: IStockItems }>());

export const addStockItemFailure = createAction('[Compare/API] Add StockItem Failure', props<{ stockItem: IStockItems }>());

export const removeStockItemSuccess = createAction('[Compare/API] Remove StockItem Success', props<{ stockItem: IStockItems }>());

export const removeStockItemFailure = createAction('[Compare/API] Remove StockItem Failure', props<{ stockItem: IStockItems }>());

export const loadStockItemsSuccess = createAction('[Compare/API] Load StockItems Success', props<{ stockItems: IStockItems[] }>());

export const loadStockItemsFailure = createAction('[Compare/API] Load StockItems Failure', props<{ error: any }>());

// Load Compare Action
export const loadCompare = createAction('[Compare Page] Load Compare');
