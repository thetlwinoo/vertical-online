import { createAction, props } from '@ngrx/store';

import { IStockItems } from '@eps/models';

export const addStockItemToCompare = createAction(
  '[Selected StockItem Page] Add StockItem to Compare',
  props<{ stockItem: IStockItems }>()
);

export const removeStockItemFromCompare = createAction(
  '[Selected Stock Item Page] Remove StockItem from Compare',
  props<{ stockItem: IStockItems }>()
);

export const addStockItemToWishlist = createAction(
  '[Selected StockItem Page] Add StockItem to Wishlist',
  props<{ stockItem: IStockItems }>()
);

export const removeStockItemFromWishlist = createAction(
  '[Selected StockItem Page] Remove StockItem from Wishlist',
  props<{ stockItem: IStockItems }>()
);
