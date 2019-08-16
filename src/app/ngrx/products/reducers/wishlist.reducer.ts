import { createReducer, on } from '@ngrx/store';

import {
    WishlistActions
} from 'app/ngrx/products/actions';

export const wishlistFeatureKey = 'wishlist';

export interface State {
    loaded: boolean;
    loading: boolean;
    ids: number[];
}

const initialState: State = {
    loaded: false,
    loading: false,
    ids: [],
};

export const reducer = createReducer(
    initialState,
    on(WishlistActions.loadWishlist, state => ({
        ...state,
        loading: true,
    })),
    on(WishlistActions.loadProductsSuccess, (state, { products }) => ({
        loaded: true,
        loading: false,
        ids: products.map(book => book.id),
    })),
    // Supports handing multiple types of actions
    on(
        WishlistActions.addProductSuccess,
        WishlistActions.removeProductFailure,
        (state, { product }) => {
            if (state.ids.indexOf(product.id) > -1) {
                return state;
            }
            return {
                ...state,
                ids: [...state.ids, product.id],
            };
        }
    ),
    on(
        WishlistActions.removeProductSuccess,
        WishlistActions.addProductFailure,
        (state, { product }) => ({
            ...state,
            ids: state.ids.filter(id => id !== product.id),
        })
    )
);

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getIds = (state: State) => state.ids;
