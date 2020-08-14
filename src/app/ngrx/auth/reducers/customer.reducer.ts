import { createReducer, on } from '@ngrx/store';

import { CustomerActions } from 'app/ngrx/auth/actions';
import { ICustomers } from '@vertical/models';

export const customerFeatureKey = 'customer';

export interface State {
  loaded: boolean;
  loading: boolean;
  customer: ICustomers;
  error: string;
}

const initialState: State = {
  loaded: false,
  loading: false,
  customer: null,
  error: '',
};

export const reducer = createReducer(
  initialState,
  on(CustomerActions.fetchCustomer, state => ({
    ...state,
    loading: true,
  })),
  on(CustomerActions.fetchCustomerSuccess, (state, { customer }) => ({
    loaded: true,
    loading: false,
    customer,
    error: '',
  })),
  on(CustomerActions.customerError, (state, { errorMsg }) => ({
    ...state,
    loading: false,
    error: errorMsg,
  }))
);

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getCustomer = (state: State) => state.customer;

export const getError = (state: State) => state.error;
