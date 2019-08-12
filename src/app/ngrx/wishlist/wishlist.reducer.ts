import * as WishlistActions from './wishlist.actions';
import { Wishlists } from '@root/models';
import { HttpError } from "../app.reducers";
import { filter, map } from 'rxjs/operators';

export interface State {
    isInWishlist: boolean;
    wishlists: Wishlists;
    errors: HttpError[];
    loading: boolean;
    fetchLoading: boolean;
}

const initialState: State = {
    isInWishlist: false,
    wishlists: null,
    errors: [],
    loading: false,
    fetchLoading: false
};

export function wishlistReducer(state = initialState, action: WishlistActions.WishlistActions) {
    switch (action.type) {
        case (WishlistActions.FETCH_WISHLIST):
            return {
                ...state,
                fetchLoading: true
            };

        case (WishlistActions.FETCH_WISHLIST_SUCCESS):
            let fetchErrorClear = state.errors;
            for (let i = 0; i < fetchErrorClear.length; i++) {
                if (fetchErrorClear[i].errorEffect === action.payload.effect) {
                    fetchErrorClear = fetchErrorClear.splice(i, 1);
                }
            }

            if (action.payload.wishlist == null || action.payload.wishlist == undefined) {
                return {
                    ...state,
                    wishlists: null,
                    errors: fetchErrorClear,
                    loading: state.loading,
                    fetchLoading: false
                }
            }

            console.log('FWS',action.payload)
            return {
                ...state,
                wishlists: action.payload.wishlist,
                errors: fetchErrorClear,
                loading: state.loading,
                fetchLoading: false
            };

        case (WishlistActions.CHECK_IN_WISHLIST_SUCCESS):
            let checkErrorClear = state.errors;
            for (let i = 0; i < checkErrorClear.length; i++) {
                if (checkErrorClear[i].errorEffect === action.payload.effect) {
                    checkErrorClear = checkErrorClear.splice(i, 1);
                }
            }

            return {
                ...state,
                isInWishlist: action.payload.isInWishlist,
                errors: checkErrorClear,
                loading: false,
            };

        case (WishlistActions.ADD_TO_WISHLIST):
        case (WishlistActions.CHECK_IN_WISHLIST):
        case (WishlistActions.REMOVE_FROM_WISHLIST):
            return {
                ...state,
                loading: true
            };

        case (WishlistActions.SET_WISHLIST):
            let wishlistErrorClear = state.errors;
            for (let i = 0; i < wishlistErrorClear.length; i++) {
                if (wishlistErrorClear[i].errorEffect === action.payload.effect) {
                    wishlistErrorClear = wishlistErrorClear.splice(i, 1);
                }
            }

            if (action.payload.wishlist == null || action.payload.wishlist == undefined) {
                return {
                    ...state,
                    wishlists: null,
                    errors: wishlistErrorClear,
                    loading: false,
                    fetchLoading: state.fetchLoading
                }
            }

            console.log('Actions Success', action.payload.wishlist.wishlistLists);

            let _IsInWishlist: boolean = (action.payload.effect == WishlistActions.ADD_TO_WISHLIST);

            return {
                ...state,
                isInWishlist: _IsInWishlist,
                wishlists: action.payload.wishlist,
                errors: wishlistErrorClear,
                loading: false,
                fetchLoading: state.fetchLoading
            };

        case (WishlistActions.WISHLIST_ERROR):
            let wishlistErrorPush = state.errors;
            for (let i = 0; i < wishlistErrorPush.length; i++) {
                if (wishlistErrorPush[i].errorEffect === action.payload.errorEffect) {
                    wishlistErrorPush[i] = action.payload;
                    return {
                        ...state,
                        errors: wishlistErrorPush,
                        loading: false
                    };
                }
            }
            wishlistErrorPush.push(action.payload);
            return {
                ...state,
                errors: wishlistErrorPush,
                loading: false
            };

        case (WishlistActions.EMPTY_WISHLIST_SUCCESS):
            return initialState;

        default:
            return state;
    }
}
