import { Action } from '@ngrx/store';
import { Compares } from "@root/models";
import { HttpError } from "../app.reducers";

export const ADD_TO_COMPARE = 'ADD_TO_COMPARE';
export const REMOVE_FROM_COMPARE = 'REMOVE_FROM_COMPARE';
export const EMPTY_COMPARE = 'EMPTY_COMPARE';
export const EMPTY_COMPARE_SUCCESS = 'EMPTY_COMPARE_SUCCESS';
export const CHECK_IN_COMPARE = 'CHECK_IN_COMPARE';
export const CHECK_IN_COMPARE_SUCCESS = 'CHECK_IN_COMPARE_SUCCESS';
export const FETCH_COMPARE = 'FETCH_COMPARE';
export const FETCH_COMPARE_SUCCESS = 'FETCH_COMPARE_SUCCESS';
export const APPLY_DISCOUNT = 'APPLY_DISCOUNT';
export const SET_COMPARE = 'SET_COMPARE';
export const COMPARE_ERROR = 'COMPARE_ERROR';

export class AddToCompare implements Action {
    readonly type = ADD_TO_COMPARE;

    constructor(public payload: number) {
    }
}

export class SetCompare implements Action {
    readonly type = SET_COMPARE;

    constructor(public payload: { compare: Compares, effect: string }) {
    }
}

export class CheckInCompare implements Action {
    readonly type = CHECK_IN_COMPARE;

    constructor(public payload: number) {
    }
}

export class CheckInCompareSuccess implements Action {
    readonly type = CHECK_IN_COMPARE_SUCCESS;

    constructor(public payload: { isInCompare: boolean, effect: string }) {
    }
}

export class RemoveFromCompare implements Action {
    readonly type = REMOVE_FROM_COMPARE;

    constructor(public payload: number) {
    }
}

export class EmptyCompare implements Action {
    readonly type = EMPTY_COMPARE;
}

export class EmptyCompareSuccess implements Action {
    readonly type = EMPTY_COMPARE_SUCCESS;
}


export class FetchCompare implements Action {
    readonly type = FETCH_COMPARE;
}

export class FetchCompareSuccess implements Action {
    readonly type = FETCH_COMPARE_SUCCESS;

    constructor(public payload: { compare: Compares, effect: string }) {
    }
}

export class CompareError implements Action {
    readonly type = COMPARE_ERROR;

    constructor(public payload: HttpError) {
    }
}


export type CompareActions =
    FetchCompare
    | SetCompare
    | FetchCompareSuccess
    | AddToCompare
    | RemoveFromCompare
    | CheckInCompare
    | CheckInCompareSuccess
    | EmptyCompare
    | EmptyCompareSuccess
    | CompareError;
