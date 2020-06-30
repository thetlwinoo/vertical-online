import { createReducer, on } from '@ngrx/store';

import { AddressTypeActions } from 'app/ngrx/checkout/actions';
import { IAddressTypes } from '@eps/models';

export const addressTypeFeatureKey = 'addressTypes';

export interface State {
  loaded: boolean;
  loading: boolean;
  addressTypes: IAddressTypes[];
  error: string;
}

const initialState: State = {
  loaded: false,
  loading: false,
  addressTypes: [],
  error: '',
};

export const reducer = createReducer(
  initialState,
  on(AddressTypeActions.fetchAddressTypes, state => ({
    ...state,
    loading: true,
  })),
  on(AddressTypeActions.fetchAddressTypesSuccess, (state, { addressTypes }) => ({
    loaded: true,
    loading: false,
    addressTypes,
    error: '',
  })),
  on(AddressTypeActions.addressTypeError, (state, { errorMsg }) => ({
    ...state,
    loading: false,
    error: errorMsg,
  }))
);

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getAddressTypes = (state: State) => state.addressTypes;

export const getError = (state: State) => state.error;
