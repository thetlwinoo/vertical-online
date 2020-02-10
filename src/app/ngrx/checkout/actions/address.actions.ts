import { createAction, props } from '@ngrx/store';

import { IAddresses } from '@eps/models';

export const fetchAddresses = createAction('[Addresses/API] Fetch Addresses');

export const fetchAddressesSuccess = createAction(
    '[Addresses/API] Fetch Addresses Success',
    props<{ addresses: IAddresses[] }>()
);

export const createAddress = createAction(
    '[Addresses/API] Create Address',
    props<{ address: IAddresses }>()
);

export const createAddressSuccess = createAction(
    '[Addresses/API] Create Address Success',
    props<{ address: IAddresses }>()
);

export const removeAddress = createAction(
    '[Addresses/API] Remove Address',
    props<{ address: IAddresses }>()
);

export const removeAddressSuccess = createAction(
    '[Addresses/API] Remove Address Success',
    props<{ address: IAddresses }>()
);

export const updateAddress = createAction(
    '[Addresses/API] Update Address',
    props<{ address: IAddresses }>()
);

export const updateAddressSuccess = createAction(
    '[Addresses/API] Update Address Success',
    props<{ address: IAddresses }>()
);

export const setDefault = createAction(
    '[Addresses/API] Set Default Address',
    props<{ id: number }>()
);

export const setDefaultSuccess = createAction(
    '[Addresses/API] Set Default Address Success',
    props<{ address: IAddresses }>()
);

export const addressError = createAction(
    '[Addresses/API] Address Error',
    props<{ errorMsg: string }>()
);