import { createReducer, on } from '@ngrx/store';

import { OrderTrackingActions } from 'app/ngrx/checkout/actions';
import { IOrderTracking } from '@eps/models';

export const orderTrackingFeatureKey = 'orderTracking';

export interface State {
  loaded: boolean;
  loading: boolean;
  orderTrackings: IOrderTracking[];
  error: string;
}

const initialState: State = {
  loaded: false,
  loading: false,
  orderTrackings: [],
  error: '',
};

export const reducer = createReducer(
  initialState,
  on(OrderTrackingActions.fetchOrderTracking, state => ({
    ...state,
    loading: true,
  })),
  on(OrderTrackingActions.fetchOrderTrackingSuccess, (state, { orderTrackings }) => ({
    ...state,
    loaded: true,
    loading: false,
    orderTrackings,
    error: '',
  })),
  on(OrderTrackingActions.orderTrackingError, (state, { errorMsg }) => ({
    ...state,
    loading: false,
    error: errorMsg,
  }))
);

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getOrderTracking = (state: State) => state.orderTrackings;

export const getError = (state: State) => state.error;
