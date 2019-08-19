import { createReducer, on } from '@ngrx/store';

import {
    AddressActions
} from 'app/ngrx/checkout/actions';
import { IAddresses } from '@root/models';

export const addressFeatureKey = 'addresses';

export interface State {
    loaded: boolean;
    loading: boolean;
    addresses: IAddresses[];
    default: IAddresses;
    error: string;
}

const initialState: State = {
    loaded: false,
    loading: false,
    addresses: [],
    default: null,
    error: ''
};

export const reducer = createReducer(
    initialState,
    on(AddressActions.fetchAddresses, state => ({
        ...state,
        loading: true,
    })),
    on(AddressActions.fetchAddressesSuccess, (state, { addresses }) => ({
        loaded: true,
        loading: false,
        addresses: addresses,
        default: addresses.filter(address => address.defaultInd == true)[0],
        error: ''
    })),
    on(AddressActions.addressError, (state, { errorMsg }) => ({
        ...state,
        loading: false,
        error: errorMsg
    }))
)

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getAddresses = (state: State) => state.addresses;

export const getDefaultAddress = (state: State) => state.default;

export const getError = (state: State) => state.error;