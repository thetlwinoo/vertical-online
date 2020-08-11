import { createReducer, on } from '@ngrx/store';

import { ProductHomeActions } from 'app/ngrx/products/actions';

export const productHomeFeatureKey = 'productHome';

export interface State {
  loaded: boolean;
  loading: boolean;
  payload: any;
  error: string;
}

const initialState: State = {
  loaded: false,
  loading: false,
  payload: [],
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(ProductHomeActions.fetchProductsHome, state => ({
    ...state,
    loading: true,
  })),
  on(ProductHomeActions.fetchProductsHomeSuccess, (state, { payload }) => ({
    loaded: true,
    loading: false,
    payload,
  })),
  on(ProductHomeActions.productHomeFailure, (state, { errorMsg }) => ({
    ...state,
    loading: false,
    error: errorMsg,
  }))
);

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getPayload = (state: State) => state.payload;

export const getError = (state: State) => state.error;
