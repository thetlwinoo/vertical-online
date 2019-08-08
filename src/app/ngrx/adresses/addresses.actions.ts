import { Action } from '@ngrx/store';
import { Addresses } from "app/core/e-commerce/_models";
import { HttpError } from "../app.reducers";

export const CREATE_ADDRESSES_FORM = 'CREATE_ADDRESSES_FORM';
export const CREATE_ADDRESSES = 'CREATE_ADDRESSES';
export const UPDATE_ADDRESSES = 'UPDATE_ADDRESSES';
export const ADDRESSES_ERROR = 'ADDRESSES_ERROR';
export const FETCH_ADDRESSES = 'FETCH_ADDRESSES';
export const FETCH_ADDRESSES_SUCCESS = 'FETCH_ADDRESSES_SUCCESS';
export const REMOVE_ADDRESSES = 'REMOVE_ADDRESSES';
export const SET_DEFAULT = 'SET_DEFAULT';

export class FetchAddresses implements Action {
    readonly type = FETCH_ADDRESSES;

    constructor() {
    }
}

export class FetchAddressesSuccess implements Action {
    readonly type = FETCH_ADDRESSES_SUCCESS;

    constructor(public payload: Addresses[]) {
    }
}

export class RemoveAddresses implements Action {
    readonly type = REMOVE_ADDRESSES;

    constructor(public payload: number) {
    }
}

export class SetDefault implements Action {
    readonly type = SET_DEFAULT;

    constructor(public payload: number) {
    }
}

export class CreateAddresses implements Action {
    readonly type = CREATE_ADDRESSES;

    constructor(public payload: Addresses) {
    }
}

export class CreateAddressesForm implements Action {
    readonly type = CREATE_ADDRESSES_FORM;

    constructor(public payload: Addresses) {
    }
}

export class UpdateAddresses implements Action {
    readonly type = UPDATE_ADDRESSES;

    constructor(public payload: Addresses) {
    }
}

export class AddressesError implements Action {
    readonly type = ADDRESSES_ERROR;

    constructor(public payload: HttpError) {
    }
}


export type AddressesActions =
    FetchAddresses
    | FetchAddressesSuccess
    | SetDefault
    | RemoveAddresses
    | CreateAddresses
    | CreateAddressesForm
    | UpdateAddresses
    | AddressesError;
