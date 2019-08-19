import { createReducer, on } from '@ngrx/store';

import {
    CartActions
} from 'app/ngrx/checkout/actions';
import { IShoppingCarts } from '@root/models';

export const cartFeatureKey = 'cart';

export interface State {
    loaded: boolean;
    loading: boolean;
    cart: IShoppingCarts;
    error: string;
}

const initialState: State = {
    loaded: false,
    loading: false,
    cart: {
        id: null,
        cartItemLists: [],
        specialDealsId: null,
        totalPrice: 0,
        totalCargoPrice: 0,
    },
    error: ''
};

export const reducer = createReducer(
    initialState,
    on(CartActions.fetchCart, state => ({
        ...state,
        loading: true,
    })),
    on(
        CartActions.fetchCartSuccess,
        CartActions.setCart,
        (state, { cart }) => ({
            loaded: true,
            loading: false,
            cart: cart,
            error: ''
        })
    ),
    on(
        CartActions.addToCart,
        CartActions.removeFromCart,
        CartActions.reduceFromCart,
        CartActions.applyDiscount,
        (state) => {
            return {
                ...state,
                loading: true,
                error: ''
            };
        }
    ),
    on(CartActions.shoppingCartError, (state, { errorMsg }) => ({
        ...state,
        loading: false,
        error: errorMsg
    }))

)

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getCart = (state: State) => state.cart;

export const getError = (state: State) => state.error;