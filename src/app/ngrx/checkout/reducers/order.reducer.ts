import { createReducer, on } from '@ngrx/store';

import { OrderActions } from 'app/ngrx/checkout/actions';
import { IOrders } from '@eps/models';

export const orderFeatureKey = 'order';

export interface State {
  loaded: boolean;
  loading: boolean;
  orders: IOrders[];
  selected: IOrders;
  error: string;
}

const initialState: State = {
  loaded: false,
  loading: false,
  orders: [],
  selected: null,
  error: '',
};

export const reducer = createReducer(
  initialState,
  on(OrderActions.fetchOrder, OrderActions.postOrder, state => ({
    ...state,
    loading: true,
  })),
  on(OrderActions.fetchOrderSuccess, (state, { orders }) => ({
    ...state,
    loaded: true,
    loading: false,
    orders,
    error: '',
  })),
  on(OrderActions.postOrderSuccess, OrderActions.selectOrder, (state, { order }) => ({
    ...state,
    loaded: true,
    loading: false,
    selected: order,
    error: '',
  })),
  on(OrderActions.emptyOrder, state => ({
    ...state,
    loaded: true,
    loading: false,
    orders: [],
    selected: null,
    error: '',
  })),
  on(OrderActions.orderError, (state, { errorMsg }) => ({
    ...state,
    loading: false,
    error: errorMsg,
  }))
);

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getOrders = (state: State) => state.orders;

export const getSelected = (state: State) => state.selected;

export const getError = (state: State) => state.error;
