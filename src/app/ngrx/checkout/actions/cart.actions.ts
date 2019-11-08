import { createAction, props } from '@ngrx/store';

import { IShoppingCarts, AddToCartProps, ReduceFromCartProps } from '@epm/models';

export const addToCart = createAction(
    '[ShoppingCarts/API] Add To Cart',
    props<{ props: AddToCartProps }>()
);

export const selectProduct = createAction(
    '[ShoppingCarts/View Product] Select Product',
    props<{ id: number }>()
);

export const addToCartSuccess = createAction(
    '[ShoppingCarts/API] Add To Cart Success',
    props<{ cart: IShoppingCarts }>()
);

export const removeFromCart = createAction(
    '[ShoppingCarts/API] Remove From Cart',
    props<{ id: number }>()
);

export const removeFromCartSuccess = createAction(
    '[ShoppingCarts/API] Remove From Cart Success',
    props<{ cart: IShoppingCarts }>()
);

export const reduceFromCart = createAction(
    '[ShoppingCarts/API] Reduce From Cart',
    props<{ props: ReduceFromCartProps }>()
);

export const reduceFromCartSuccess = createAction(
    '[ShoppingCarts/API] Reduce From Cart Success',
    props<{ cart: IShoppingCarts }>()
);

export const emptyCart = createAction('[ShoppingCarts/API] Empty Cart');

export const emptyCartSuccess = createAction(
    '[ShoppingCarts/API] Empty Cart Success',
    props<{ success: any }>()
);

export const fetchCart = createAction('[ShoppingCarts/API] Fetch Cart');

export const fetchCartSuccess = createAction(
    '[ShoppingCarts/API] Fetch Cart Success',
    props<{ cart: IShoppingCarts }>()
);

export const applyDiscount = createAction(
    '[ShoppingCarts/API] Apply Discount',
    props<{ code: string }>()
);

export const applyDiscountSuccess = createAction(
    '[ShoppingCarts/API] Apply Discount Success',
    props<{ cart: IShoppingCarts }>()
);

export const setCart = createAction(
    '[ShoppingCarts/API] Set Cart',
    props<{ cart: IShoppingCarts }>()
);

export const setCartSuccess = createAction(
    '[ShoppingCarts/API] Set Cart Success',
    props<{ cart: IShoppingCarts }>()
);

export const shoppingCartError = createAction(
    '[ShoppingCarts/API] Shopping Cart Error',
    props<{ errorMsg: string }>()
);