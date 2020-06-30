/* eslint-disable camelcase */
import { createReducer, on } from '@ngrx/store';
import { groupBy, flatMap } from 'rxjs/operators';

import { CartActions } from 'app/ngrx/checkout/actions';
import { IShoppingCarts } from '@eps/models';
import { identifierModuleUrl } from '@angular/compiler';

export const cartFeatureKey = 'cart';

export interface State {
  loaded: boolean;
  loading: boolean;
  cart: IShoppingCarts;
  totalQuantity: number;
  cartPrice: number;
  itemCount: number;
  stockItemIds: number[];
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
  stockItemIds: [],
  selectedProductId: null,
  error: '',
};

export const reducer = createReducer(
  initialState,
  on(CartActions.fetchCart, state => ({
    ...state,
    loading: true,
  })),
  on(CartActions.fetchCartSuccess, CartActions.setCart, (state, { cart }) => ({
    loaded: true,
    loading: false,
    cart,
    totalQuantity: cart ? cart.cartString?.totalQuantity : 0,
    cartPrice: cart ? cart.cartString?.cartPrice : 0.0,
    itemCount: cart ? cart.cartString?.itemCount : 0,
    stockItemIds: cart ? cart.cartString?.stockItemList.split(',') : [],
    error: '',
  })),
  on(CartActions.selectProduct, (state, { id }) => ({
    ...state,
    selectedProductId: id,
  })),
  on(
    CartActions.addToCart,
    CartActions.removeFromCart,
    CartActions.reduceFromCart,
    CartActions.applyDiscount,
    CartActions.changedAddToOrder,
    CartActions.changedOrderAll,
    state => ({
      ...state,
      loading: true,
      error: '',
    })
  ),
  on(CartActions.emptyCartSuccess, () => initialState),
  on(CartActions.shoppingCartError, (state, { errorMsg }) => ({
    ...state,
    loading: false,
    error: errorMsg,
  }))
);

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getCart = (state: State) => state.cart;

export const getTotalQuantity = (state: State) => state.totalQuantity;

export const getCartPrice = (state: State) => state.cartPrice;

export const getItemCount = (state: State) => state.itemCount;

export const getStockItemIds = (state: State) => state.stockItemIds;

export const getSelectedId = (state: State) => state.selectedProductId;

export const getError = (state: State) => state.error;
