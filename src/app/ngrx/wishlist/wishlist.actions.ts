import { Action } from '@ngrx/store';
import { Wishlists } from "app/core/e-commerce/_models";
import { HttpError } from "../app.reducers";

export const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST';
export const REMOVE_FROM_WISHLIST = 'REMOVE_FROM_WISHLIST';
export const EMPTY_WISHLIST = 'EMPTY_WISHLIST';
export const EMPTY_WISHLIST_SUCCESS = 'EMPTY_WISHLIST_SUCCESS';
export const CHECK_IN_WISHLIST = 'CHECK_IN_WISHLIST';
export const CHECK_IN_WISHLIST_SUCCESS = 'CHECK_IN_WISHLIST_SUCCESS';
export const FETCH_WISHLIST = 'FETCH_WISHLIST';
export const FETCH_WISHLIST_SUCCESS = 'FETCH_WISHLIST_SUCCESS';
export const APPLY_DISCOUNT = 'APPLY_DISCOUNT';
export const SET_WISHLIST = 'SET_WISHLIST';
export const WISHLIST_ERROR = 'WISHLIST_ERROR';

export class AddToWishlist implements Action {
    readonly type = ADD_TO_WISHLIST;

    constructor(public payload: number) {
    }
}

export class SetWishlist implements Action {
    readonly type = SET_WISHLIST;

    constructor(public payload: { wishlist: Wishlists, effect: string }) {
    }
}

export class CheckInWishlist implements Action {
    readonly type = CHECK_IN_WISHLIST;

    constructor(public payload: number) {
    }
}

export class CheckInWishlistSuccess implements Action {
    readonly type = CHECK_IN_WISHLIST_SUCCESS;

    constructor(public payload: { isInWishlist: boolean, effect: string }) {
    }
}

export class RemoveFromWishlist implements Action {
    readonly type = REMOVE_FROM_WISHLIST;

    constructor(public payload: number) {
    }
}

export class EmptyWishlist implements Action {
    readonly type = EMPTY_WISHLIST;
}

export class EmptyWishlistSuccess implements Action {
    readonly type = EMPTY_WISHLIST_SUCCESS;
}


export class FetchWishlist implements Action {
    readonly type = FETCH_WISHLIST;
}

export class FetchWishlistSuccess implements Action {
    readonly type = FETCH_WISHLIST_SUCCESS;

    constructor(public payload: { wishlist: Wishlists, effect: string }) {
    }
}

export class WishlistError implements Action {
    readonly type = WISHLIST_ERROR;

    constructor(public payload: HttpError) {
    }
}


export type WishlistActions =
    FetchWishlist
    | SetWishlist
    | FetchWishlistSuccess
    | AddToWishlist
    | RemoveFromWishlist
    | CheckInWishlist
    | CheckInWishlistSuccess
    | EmptyWishlist
    | EmptyWishlistSuccess
    | WishlistError;
