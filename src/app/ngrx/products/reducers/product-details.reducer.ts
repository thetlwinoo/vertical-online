/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createReducer, on } from '@ngrx/store';

import { ProductDetailsActions } from 'app/ngrx/products/actions';

export const productDetailsFeatureKey = 'productDetails';

export interface State {
  loaded: boolean;
  loading: boolean;
  productDetails: any;
}

const initialState: State = {
  loaded: false,
  loading: false,
  productDetails: null,
};

export const reducer = createReducer(
  initialState,
  on(ProductDetailsActions.fetchProductDetails, state => ({
    ...state,
    loading: true,
  })),
  on(ProductDetailsActions.fetcProductDetailsSuccess, (state, { productDetails }) => ({
    loaded: true,
    loading: false,
    productDetails,
  }))
);

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getProductDetails = (state: State) => state.productDetails;
