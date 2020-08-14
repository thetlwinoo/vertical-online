import { createAction, props } from '@ngrx/store';

import { IStockItems } from '@vertical/models';

export const addStockItemSuccess = createAction('[Wishlist/API] Add StockItem Success', props<{ stockItem: IStockItems }>());

export const addStockItemFailure = createAction('[Wishlist/API] Add StockItem Failure', props<{ stockItem: IStockItems }>());

export const removeStockItemSuccess = createAction('[Wishlist/API] Remove StockItem Success', props<{ stockItem: IStockItems }>());

export const removeStockItemFailure = createAction('[Wishlist/API] Remove StockItem Failure', props<{ stockItem: IStockItems }>());

export const loadStockItemsSuccess = createAction('[Wishlist/API] Load StockItems Success', props<{ stockItems: IStockItems[] }>());

export const loadStockItemsFailure = createAction('[Wishlist/API] Load StockItems Failure', props<{ error: any }>());

// Load Wishlist Action
export const loadWishlist = createAction('[Wishlist Page] Load Wishlist');
