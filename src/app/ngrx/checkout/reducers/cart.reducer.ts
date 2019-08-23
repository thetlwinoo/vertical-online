import { createReducer, on } from '@ngrx/store';
import { groupBy, flatMap } from 'rxjs/operators';

import {
    CartActions
} from 'app/ngrx/checkout/actions';
import { IShoppingCarts } from '@root/models';
import { identifierModuleUrl } from '@angular/compiler';

export const cartFeatureKey = 'cart';

export interface State {
    loaded: boolean;
    loading: boolean;
    cart: IShoppingCarts;
    totalQuantity: number;
    cartPrice: number;
    itemCount: number;
    productIds: number[];
    selectedProductId: number;
    error: string;
}

const initialState: State = {
    loaded: false,
    loading: false,
    cart: null,
    totalQuantity: null,
    cartPrice: null,
    itemCount: null,
    productIds: [],
    selectedProductId: null,
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
            totalQuantity: cart ? cart.cartItemLists.map(item => item.quantity).reduce((total, quantity) => total + quantity, 0) : 0,
            cartPrice: cart ? cart.cartItemLists.map(item => item).reduce((total, item) => total + (item.product.unitPrice * item.quantity), 0) : 0,
            itemCount: cart ? cart.cartItemLists.length : 0,
            productIds: cart ? cart.cartItemLists.map(item => item.productId ? item.productId : item.product.id) : [],
            error: ''
        })
    ),
    on(CartActions.selectProduct, (state, { id }) => ({
        ...state,
        selectedProductId: id,
    })),
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
    on(CartActions.emptyCartSuccess, () => initialState),
    on(CartActions.shoppingCartError, (state, { errorMsg }) => ({
        ...state,
        loading: false,
        error: errorMsg
    }))

)

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getCart = (state: State) => state.cart;

export const getTotalQuantity = (state: State) => state.totalQuantity;

export const getCartPrice = (state: State) => state.cartPrice;

export const getItemCount = (state: State) => state.itemCount;

export const getProductIds = (state: State) => state.productIds;

export const getSelectedId = (state: State) => state.selectedProductId;

export const getError = (state: State) => state.error;