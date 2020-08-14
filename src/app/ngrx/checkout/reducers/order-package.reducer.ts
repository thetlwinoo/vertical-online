import { createReducer, on } from '@ngrx/store';

import { OrderPackageActions } from 'app/ngrx/checkout/actions';
import { IOrderPackages } from '@vertical/models';

export const orderPackageFeatureKey = 'orderPackage';

export interface State {
  loaded: boolean;
  loading: boolean;
  orderPackages: IOrderPackages[];
  selected: IOrderPackages;
  error: string;
}

const initialState: State = {
  loaded: false,
  loading: false,
  orderPackages: [],
  selected: null,
  error: '',
};

export const reducer = createReducer(
  initialState,
  on(OrderPackageActions.getOrderPackage, state => ({
    ...state,
    loading: true,
  })),
  on(
    OrderPackageActions.getOrderPackageSuccess,
    OrderPackageActions.saveOrderPackageSuccess,
    OrderPackageActions.saveReviewsSuccess,
    (state, { orderPackage }) => ({
      ...state,
      loaded: true,
      loading: false,
      selected: orderPackage,
      error: '',
    })
  ),
  on(OrderPackageActions.orderPackageError, (state, { errorMsg }) => ({
    ...state,
    loading: false,
    error: errorMsg,
  }))
);

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getOrderPackages = (state: State) => state.orderPackages;

export const getSelected = (state: State) => state.selected;

export const getError = (state: State) => state.error;
