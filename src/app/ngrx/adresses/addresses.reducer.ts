import * as AddressesActions from './addresses.actions';
import { Addresses } from '@root/models';
import { HttpError } from "../app.reducers";

export interface State {
    addresses: any[];
    postAddresses: any;
    default: any;
    errors: HttpError[];
    canFetch: boolean;
    isSelected: boolean;
    loading: boolean;
}

const initialState: State = {
    addresses: null,
    postAddresses: null,
    default: null,
    errors: [],
    canFetch: true,
    isSelected: false,
    loading: false
};

export function addressReducer(state = initialState, action: AddressesActions.AddressesActions) { //TODO why are we storing orders again?
    switch (action.type) {
        case (AddressesActions.CREATE_ADDRESSES_FORM):
            let postAddressFormErrorClear = state.errors;
            for (let i = 0; i < postAddressFormErrorClear.length; i++) {
                if (postAddressFormErrorClear[i].errorEffect === 'CREATE_ADDRESSES_FORM') {
                    postAddressFormErrorClear = postAddressFormErrorClear.splice(i, 1);
                }
            }
            return {
                ...state,
                postAddresses: action.payload,
                isSelected: true,
                errors: postAddressFormErrorClear
            };
        case (AddressesActions.FETCH_ADDRESSES_SUCCESS):
            let fetchAddressesErrorClear = state.errors;
            for (let i = 0; i < fetchAddressesErrorClear.length; i++) {
                if (fetchAddressesErrorClear[i].errorEffect === 'FETCH_ADDRESSES') {
                    fetchAddressesErrorClear = fetchAddressesErrorClear.splice(i, 1);
                }
            }

            if (action.payload.length == 0) {
                return {
                    ...state,
                    canFetch: false,
                    isSelected: false,
                    errors: fetchAddressesErrorClear,
                    loading: false
                }
            }            

            return {
                ...state,
                addresses: action.payload,
                default: action.payload.filter(data=> data.defaultInd == true)[0],
                canFetch: true,
                isSelected: true,
                errors: fetchAddressesErrorClear,
                loading: false
            };

        case (AddressesActions.ADDRESSES_ERROR):
            let addressErrorPush = state.errors;
            for (let i = 0; i < addressErrorPush.length; i++) {
                if (addressErrorPush[i].errorEffect === action.payload.errorEffect) {
                    addressErrorPush[i] = action.payload;
                    return {
                        ...state,
                        errors: addressErrorPush
                    };
                }
            }
            addressErrorPush.push(action.payload);
            return {
                ...state,
                errors: addressErrorPush
            };
        default:
            return state;
    }
}