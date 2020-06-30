import { createReducer, on } from '@ngrx/store';

import { CompareActions } from 'app/ngrx/products/actions';
import { IStockItems } from '@eps/models';

export const compareFeatureKey = 'compare';

export interface State {
  loaded: boolean;
  loading: boolean;
  ids: number[];
  stockItems: IStockItems[];
  count: number;
}

const initialState: State = {
  loaded: false,
  loading: false,
  ids: [],
  stockItems: [],
  count: 0,
};

export const reducer = createReducer(
  initialState,
  on(CompareActions.loadCompare, state => ({
    ...state,
    loading: true,
  })),
  on(CompareActions.loadStockItemsSuccess, (state, { stockItems }) => ({
    loaded: true,
    loading: false,
    ids: stockItems.map(item => item.id),
    stockItems,
    count: stockItems.length || 0,
  })),
  // Supports handing multiple types of actions
  on(CompareActions.addStockItemSuccess, CompareActions.removeStockItemFailure, (state, { stockItem }) => {
    if (state.ids.includes(stockItem.id)) {
      return state;
    }
    return {
      ...state,
      ids: [...state.ids, stockItem.id],
      stockItems: [...state.stockItems, stockItem],
    };
  }),
  on(CompareActions.removeStockItemSuccess, CompareActions.addStockItemFailure, (state, { stockItem }) => ({
    ...state,
    ids: state.ids.filter(id => id !== stockItem.id),
    stockItems: state.stockItems.filter(p => p.id !== stockItem.id),
  }))
);

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getIds = (state: State) => state.ids;

export const getStockItems = (state: State) => state.stockItems;

export const getCount = (state: State) => state.count;
