import { createReducer, on } from '@ngrx/store';

import { OrderActions } from 'app/ngrx/checkout/actions';
import { IOrders } from '@eps/models';

export const orderFeatureKey = 'order';

export interface State {
  loaded: boolean;
  loading: boolean;
  orders: IOrders[];
  trackOrders: IOrders[];
  reviewOrders: IOrders[];
  totalOrders: number;
  totalReviewOrders: number;
  selected: IOrders;
  error: string;
}

const initialState: State = {
  loaded: false,
  loading: false,
  orders: [],
  trackOrders: [],
  totalOrders: 0,
  reviewOrders: [],
  totalReviewOrders: 0,
  selected: null,
  error: '',
};

export const reducer = createReducer(
  initialState,
  on(OrderActions.fetchOrder, OrderActions.fetchTrackOrder, OrderActions.postOrder, OrderActions.fetchCustomerOrdersReviews, state => ({
    ...state,
    loading: true,
  })),
  on(OrderActions.fetchOrderSuccess, (state, { payload }) => ({
    ...state,
    loaded: true,
    loading: false,
    orders: payload.body,
    totalOrders: Number(payload.headers.get('X-Total-Count')),
    error: '',
  })),
  on(OrderActions.fetchCustomerOrdersReviewsSuccess, (state, { payload }) => ({
    ...state,
    loaded: true,
    loading: false,
    reviewOrders: payload.body,
    totalReviewOrders: Number(payload.headers.get('X-Total-Count')),
    error: '',
  })),
  on(OrderActions.fetchTrackOrderSuccess, (state, { orders }) => ({
    ...state,
    loaded: true,
    loading: false,
    trackOrders: orders,
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

export const getTrackOrders = (state: State) => state.trackOrders;

export const getOrders = (state: State) => state.orders;

export const getTotalOrders = (state: State) => state.totalOrders;

export const getReviewOrders = (state: State) => state.reviewOrders;

export const getTotalReviewOrders = (state: State) => state.totalReviewOrders;

export const getSelected = (state: State) => state.selected;

export const getError = (state: State) => state.error;
