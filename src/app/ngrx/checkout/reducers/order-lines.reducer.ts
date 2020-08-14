import { createReducer, on } from '@ngrx/store';

import { OrderLineActions } from 'app/ngrx/checkout/actions';
import { IOrders, Orders, IOrderLines } from '@vertical/models';

export const orderLinesFeatureKey = 'orderLines';

export interface State {
  loaded: boolean;
  loading: boolean;
  orderLines: IOrderLines[];
  currentOrderLine: IOrderLines;
  success: boolean;
  error: string;
}

const initialState: State = {
  loaded: false,
  loading: false,
  orderLines: [],
  currentOrderLine: null,
  success: false,
  error: '',
};

export const reducer = createReducer(
  initialState,
  on(OrderLineActions.fetchOrderLines, state => ({
    ...state,
    loading: true,
  })),
  on(OrderLineActions.fetchOrderLinesSuccess, (state, { orderLines }) => ({
    ...state,
    loaded: true,
    loading: false,
    orderLines,
    error: '',
  })),
  on(OrderLineActions.saveOrderLineListSuccess, (state, { success }) => ({
    ...state,
    success,
    error: '',
  })),
  on(OrderLineActions.orderLineError, (state, { errorMsg }) => ({
    ...state,
    loading: false,
    error: errorMsg,
  }))
);

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getOrderLines = (state: State) => state.orderLines;

export const getCurrentOrderLine = (state: State) => state.currentOrderLine;

export const getSaveOrderLineListSuccess = (state: State) => state.success;

export const getError = (state: State) => state.error;
